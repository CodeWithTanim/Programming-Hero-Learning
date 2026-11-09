"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Studio, Booking } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  LayoutDashboard, 
  Layers, 
  CalendarCheck, 
  Heart, 
  PlusCircle, 
  ArrowRight, 
  Building2, 
  Clock, 
  DollarSign, 
  Calendar,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [myStudios, setMyStudios] = useState<Studio[]>([]);
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Protected route check
  useEffect(() => {
    if (!isPending && !user) {
      router.push("/login?callbackUrl=/dashboard");
    }
  }, [isPending, user, router]);

  useEffect(() => {
    if (!user?.email) return;

    async function loadDashboardData() {
      try {
        setLoading(true);
        const serverUrl = (process.env.NEXT_PUBLIC_SERVER_API || "http://localhost:8000").replace(/\/+$/, "");

        // Fetch user's listings
        const studiosPromise = fetch(`${serverUrl}/api/my-studios/${encodeURIComponent(user?.email || "")}`, {
          cache: "no-store",
        }).then((res) => (res.ok ? res.json() : []));

        // Fetch user's bookings
        const bookingsPromise = fetch(`${serverUrl}/api/my-bookings/${encodeURIComponent(user?.email || "")}`, {
          cache: "no-store",
        }).then((res) => (res.ok ? res.json() : []));

        // Fetch user's wishlist
        const wishlistPromise = fetch(`${serverUrl}/api/wishlist/${encodeURIComponent(user?.email || "")}`, {
          cache: "no-store",
        }).then((res) => (res.ok ? res.json() : { studioIds: [] }));

        const [studiosData, bookingsData, wishlistData] = await Promise.all([
          studiosPromise,
          bookingsPromise,
          wishlistPromise,
        ]);

        setMyStudios(Array.isArray(studiosData) ? studiosData : []);
        setMyBookings(Array.isArray(bookingsData) ? bookingsData : []);
        setWishlistCount((wishlistData?.studioIds || []).length);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [user?.email]);

  if (isPending || (!user && loading)) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="space-y-3">
          <Skeleton className="h-8 w-64 rounded-xl" />
          <Skeleton className="h-4 w-96 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const pendingBookings = myBookings.filter((b) => b.status === "Pending").length;
  const confirmedBookings = myBookings.filter((b) => b.status === "Confirmed").length;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-muted/20 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-semibold uppercase tracking-wider">
              <span className="size-2 rounded-full bg-orange-500" />
              Creator Control Center
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Welcome back, {user?.name || "Creator"}!
            </h1>
            <p className="text-sm text-muted-foreground">
              Monitor your studio listings, track shoot reservations, and manage your production schedule.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-md shadow-orange-500/20 cursor-pointer"
              asChild
            >
              <Link href="/add-studio">
                <PlusCircle className="size-4 mr-1.5" />
                <span>Add New Studio</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="rounded-xl border-border hover:bg-muted font-medium cursor-pointer"
              asChild
            >
              <Link href="/studios">
                <span>Explore Studios</span>
                <ArrowRight className="size-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* 4 Quick Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: My Studios */}
          <Link
            href="/my-listings"
            className="group p-6 rounded-2xl bg-card border border-border/80 hover:border-orange-500/50 shadow-xs hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                My Studios
              </span>
              <div className="size-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="size-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-foreground">
              {loading ? <Skeleton className="h-9 w-12 rounded-lg" /> : myStudios.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
              <span>Manage your active listings</span>
              <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
            </p>
          </Link>

          {/* Card 2: Confirmed Bookings */}
          <Link
            href="/my-bookings"
            className="group p-6 rounded-2xl bg-card border border-border/80 hover:border-orange-500/50 shadow-xs hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Confirmed Shoots
              </span>
              <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CalendarCheck className="size-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-foreground">
              {loading ? <Skeleton className="h-9 w-12 rounded-lg" /> : confirmedBookings}
            </div>
            <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
              <span>View shoot dates & invoices</span>
              <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
            </p>
          </Link>

          {/* Card 3: Pending Approvals */}
          <Link
            href="/my-bookings"
            className="group p-6 rounded-2xl bg-card border border-border/80 hover:border-orange-500/50 shadow-xs hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Pending Bookings
              </span>
              <div className="size-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="size-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-foreground">
              {loading ? <Skeleton className="h-9 w-12 rounded-lg" /> : pendingBookings}
            </div>
            <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
              <span>Awaiting host confirmation</span>
              <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
            </p>
          </Link>

          {/* Card 4: Saved Wishlist */}
          <Link
            href="/wishlist"
            className="group p-6 rounded-2xl bg-card border border-border/80 hover:border-orange-500/50 shadow-xs hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Saved Spaces
              </span>
              <div className="size-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="size-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-foreground">
              {loading ? <Skeleton className="h-9 w-12 rounded-lg" /> : wishlistCount}
            </div>
            <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
              <span>Review your favorite studios</span>
              <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
            </p>
          </Link>
        </div>

        {/* Two-Column Grid: Recent Bookings & Host Listings Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Recent Bookings */}
          <div className="p-6 sm:p-7 rounded-3xl bg-card border border-border/80 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-foreground">Recent Bookings</h3>
                <p className="text-xs text-muted-foreground">Your scheduled production shoot dates</p>
              </div>
              <Button variant="ghost" size="sm" asChild className="text-xs font-semibold text-orange-500 hover:text-orange-600">
                <Link href="/my-bookings">View All</Link>
              </Button>
            </div>

            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-20 w-full rounded-2xl" />
                <Skeleton className="h-20 w-full rounded-2xl" />
              </div>
            ) : myBookings.length === 0 ? (
              <div className="text-center py-10 space-y-3 border border-dashed border-border rounded-2xl">
                <Calendar className="size-8 mx-auto text-muted-foreground opacity-60" />
                <p className="text-sm text-muted-foreground">No reservations booked yet.</p>
                <Button size="sm" variant="outline" asChild className="rounded-xl">
                  <Link href="/studios">Discover Spaces</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {myBookings.slice(0, 3).map((booking) => (
                  <div
                    key={booking._id}
                    className="p-4 rounded-2xl border border-border/60 bg-muted/30 flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm text-foreground truncate">
                          {booking.studioTitle}
                        </h4>
                        <Badge
                          className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                            booking.status === "Confirmed"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                              : booking.status === "Pending"
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-2">
                        <span>{booking.date}</span>
                        <span>•</span>
                        <span>{booking.startTime} - {booking.endTime}</span>
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-foreground">${booking.totalPrice}</p>
                      <p className="text-[10px] text-muted-foreground">{booking.totalHours} hrs</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Listed Studios Preview */}
          <div className="p-6 sm:p-7 rounded-3xl bg-card border border-border/80 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-foreground">My Studio Spaces</h3>
                <p className="text-xs text-muted-foreground">Studios currently published by your account</p>
              </div>
              <Button variant="ghost" size="sm" asChild className="text-xs font-semibold text-orange-500 hover:text-orange-600">
                <Link href="/my-listings">Manage</Link>
              </Button>
            </div>

            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-20 w-full rounded-2xl" />
                <Skeleton className="h-20 w-full rounded-2xl" />
              </div>
            ) : myStudios.length === 0 ? (
              <div className="text-center py-10 space-y-3 border border-dashed border-border rounded-2xl">
                <Building2 className="size-8 mx-auto text-muted-foreground opacity-60" />
                <p className="text-sm text-muted-foreground">You haven't listed any studios yet.</p>
                <Button size="sm" className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white" asChild>
                  <Link href="/add-studio">List Your First Studio</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {myStudios.slice(0, 3).map((studio) => (
                  <div
                    key={studio._id}
                    className="p-3.5 rounded-2xl border border-border/60 bg-muted/30 flex items-center gap-3.5"
                  >
                    <img
                      src={studio.imageUrl}
                      alt={studio.title}
                      className="size-14 rounded-xl object-cover shrink-0 border border-border"
                    />
                    <div className="space-y-1 min-w-0 flex-1">
                      <h4 className="font-semibold text-sm text-foreground truncate">
                        {studio.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="text-orange-500 font-medium">${studio.hourlyRate}/hr</span>
                        <span>•</span>
                        <span className="truncate">{studio.location}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild className="rounded-lg shrink-0 text-xs h-8">
                      <Link href={`/studios/${studio._id}`}>View</Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

