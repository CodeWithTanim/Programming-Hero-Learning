"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Studio } from "@/types";
import BookingModal from "@/components/BookingModal";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star, 
  MapPin, 
  Users, 
  DollarSign, 
  ShieldCheck, 
  CheckCircle, 
  ArrowLeft, 
  Heart, 
  Share2, 
  CalendarDays,
  Building,
  Mail,
  Clock
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function StudioDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const studioId = resolvedParams.id;
  const router = useRouter();

  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Fetch studio details
  useEffect(() => {
    async function loadStudio() {
      try {
        setLoading(true);
        const serverUrl = (process.env.NEXT_PUBLIC_SERVER_API || "http://localhost:8000").replace(/\/+$/, "");
        const res = await fetch(`${serverUrl}/api/studios/${studioId}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Studio not found or unavailable.");
        }

        const data: Studio = await res.json();
        setStudio(data);
      } catch (err: any) {
        console.error("Studio details error:", err);
        setError(err.message || "Failed to load studio details.");
      } finally {
        setLoading(false);
      }
    }

    if (studioId) {
      loadStudio();
    }
  }, [studioId]);

  // Check wishlist state
  useEffect(() => {
    if (!user?.email || !studioId) return;

    async function checkWishlist() {
      try {
        const serverUrl = (process.env.NEXT_PUBLIC_SERVER_API || "http://localhost:8000").replace(/\/+$/, "");
        const res = await fetch(`${serverUrl}/api/wishlist/${encodeURIComponent(user?.email || "")}`);
        if (res.ok) {
          const data = await res.json();
          const cleanIds = (data.studioIds || []).map((id: any) => String(id));
          setIsSaved(cleanIds.includes(String(studioId)));
        }
      } catch (err) {
        console.error("Wishlist check error:", err);
      }
    }

    checkWishlist();
  }, [user?.email, studioId]);

  const handleToggleWishlist = async () => {
    if (!user) {
      toast.error("Please sign in to save studios to your wishlist.");
      router.push("/login");
      return;
    }

    try {
      const serverUrl = (process.env.NEXT_PUBLIC_SERVER_API || "http://localhost:8000").replace(/\/+$/, "");
      const token = typeof window !== "undefined" ? localStorage.getItem("studiospace_token") : null;
      const res = await fetch(`${serverUrl}/api/wishlist/toggle`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        credentials: "include",
        body: JSON.stringify({ 
          studioId,
          userEmail: user?.email 
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setIsSaved(data.saved);
        if (data.saved) {
          toast.success("Saved to your wishlist!");
        } else {
          toast.info("Removed from wishlist.");
        }
      }
    } catch (err) {
      toast.error("Network error updating wishlist.");
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Studio link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8 sm:py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
          {/* Navigation & Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Skeleton className="h-9 w-36 rounded-xl" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-20 rounded-xl" />
              <Skeleton className="h-9 w-20 rounded-xl" />
            </div>
          </div>

          {/* Title & Meta Header */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-32 rounded-full" />
              <Skeleton className="h-5 w-44 rounded-md" />
            </div>
            <Skeleton className="h-10 sm:h-12 w-3/4 max-w-2xl rounded-xl" />
          </div>

          {/* Gallery Carousel & Photo Layout Skeleton */}
          <div className="space-y-4">
            <Skeleton className="aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl" />
            {/* Thumbnails row */}
            <div className="flex items-center gap-3">
              <Skeleton className="aspect-[16/10] w-28 sm:w-36 rounded-xl shrink-0" />
              <Skeleton className="aspect-[16/10] w-28 sm:w-36 rounded-xl shrink-0" />
            </div>
          </div>

          {/* Content & Booking Sidebar Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left 2 Columns: Specs, Overview, Amenities, Reviews */}
            <div className="lg:col-span-2 space-y-10">
              {/* 4 Quick Specs Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-card border border-border space-y-2">
                    <Skeleton className="h-4 w-20 rounded-md" />
                    <Skeleton className="h-6 w-16 rounded-md" />
                  </div>
                ))}
              </div>

              {/* Workspace Overview */}
              <div className="space-y-3">
                <Skeleton className="h-7 w-52 rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-5/6 rounded-md" />
                <Skeleton className="h-4 w-2/3 rounded-md" />
              </div>

              {/* Amenities Grid */}
              <div className="space-y-4">
                <Skeleton className="h-7 w-64 rounded-md" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/80">
                      <Skeleton className="size-4 rounded-full shrink-0" />
                      <Skeleton className="h-4 w-32 rounded-md" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Host Profile */}
              <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
                <Skeleton className="h-6 w-48 rounded-md" />
                <div className="flex items-center gap-4">
                  <Skeleton className="size-14 rounded-full shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-32 rounded-md" />
                    <Skeleton className="h-3 w-44 rounded-md" />
                    <Skeleton className="h-3 w-40 rounded-md" />
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-7 w-40 rounded-md" />
                  <Skeleton className="h-5 w-24 rounded-md" />
                </div>
                <div className="p-5 rounded-2xl bg-card border border-border/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24 rounded-md" />
                    <Skeleton className="h-4 w-20 rounded-md" />
                  </div>
                  <Skeleton className="h-4 w-3/4 rounded-md" />
                  <Skeleton className="h-3 w-20 rounded-md" />
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Booking Card */}
            <div className="lg:col-span-1">
              <div className="rounded-3xl bg-card border border-border p-6 space-y-6 shadow-xl">
                <div className="flex items-baseline justify-between pb-4 border-b border-border/60">
                  <Skeleton className="h-8 w-24 rounded-md" />
                  <Skeleton className="h-4 w-12 rounded-md" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="size-4 rounded-full shrink-0" />
                    <Skeleton className="h-3.5 w-48 rounded-md" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="size-4 rounded-full shrink-0" />
                    <Skeleton className="h-3.5 w-44 rounded-md" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="size-4 rounded-full shrink-0" />
                    <Skeleton className="h-3.5 w-52 rounded-md" />
                  </div>
                </div>

                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-3 w-48 mx-auto rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !studio) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="size-16 rounded-2xl bg-destructive/10 text-destructive mx-auto flex items-center justify-center">
          <Building className="size-8" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Studio Not Found</h2>
        <p className="text-sm text-muted-foreground">
          {error || "The requested creative studio does not exist or has been removed."}
        </p>
        <Button asChild className="rounded-xl">
          <Link href="/studios">Back to Explore Studios</Link>
        </Button>
      </div>
    );
  }

  const galleryImages = studio.gallery && studio.gallery.length > 0 ? studio.gallery : [studio.imageUrl];

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation & Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="rounded-xl text-muted-foreground hover:text-foreground cursor-pointer -ml-2"
          >
            <Link href="/studios" className="flex items-center gap-1.5">
              <ArrowLeft className="size-4" />
              <span>Back to Studios</span>
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="rounded-xl border-border cursor-pointer"
            >
              <Share2 className="size-3.5 mr-1.5" />
              <span>Share</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleWishlist}
              className={`rounded-xl border-border cursor-pointer transition-colors ${
                isSaved ? "text-rose-500 border-rose-500/30 bg-rose-500/10" : ""
              }`}
            >
              <Heart className={`size-3.5 mr-1.5 ${isSaved ? "fill-current" : ""}`} />
              <span>{isSaved ? "Saved" : "Save"}</span>
            </Button>
          </div>
        </div>

        {/* Studio Title & Meta Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-orange-500 text-white font-semibold px-3 py-1 text-xs rounded-full">
              {studio.category}
            </Badge>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground bg-muted px-3 py-1 rounded-full">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              <span>{Number(studio.rating || 5.0).toFixed(1)}</span>
              <span className="text-muted-foreground">({studio.reviewsCount || 1} verified reviews)</span>
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="size-3.5 text-orange-500" />
              <span>{studio.location}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            {studio.title}
          </h1>
        </div>

        {/* Gallery Carousel & Photo Layout */}
        <div className="space-y-4">
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl overflow-hidden bg-muted border border-border/80 shadow-lg">
            <img
              src={galleryImages[activeImageIndex] || studio.imageUrl}
              alt={studio.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium">
              Photo {activeImageIndex + 1} of {galleryImages.length}
            </div>
          </div>

          {/* Thumbnails row */}
          {galleryImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[16/10] w-28 sm:w-36 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    activeImageIndex === idx ? "border-orange-500 ring-2 ring-orange-500/30 scale-105" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content & Booking Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left 2 Columns: Specs, Overview, Amenities, Reviews */}
          <div className="lg:col-span-2 space-y-10">
            {/* Quick Specs Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-card border border-border shadow-xs space-y-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <DollarSign className="size-3.5 text-orange-500" /> Hourly Rate
                </span>
                <p className="text-xl font-bold text-foreground">${studio.hourlyRate}/hr</p>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border shadow-xs space-y-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <ShieldCheck className="size-3.5 text-emerald-500" /> Security Deposit
                </span>
                <p className="text-xl font-bold text-foreground">${studio.securityDeposit || 0}</p>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border shadow-xs space-y-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="size-3.5 text-blue-500" /> Max Capacity
                </span>
                <p className="text-xl font-bold text-foreground">{studio.maxCapacity || 10} creators</p>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border shadow-xs space-y-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="size-3.5 text-purple-500" /> Booking
                </span>
                <p className="text-xl font-bold text-foreground">Instant</p>
              </div>
            </div>

            {/* Detailed Overview */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                Workspace Overview
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                {studio.overview}
              </p>
            </div>

            {/* Amenities List */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                Included Amenities & Equipment
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {studio.amenities && studio.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-card border border-border/80 text-sm font-medium text-foreground"
                  >
                    <CheckCircle className="size-4 text-emerald-500 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Host Profile */}
            <div className="p-6 rounded-2xl bg-card border border-border space-y-4 shadow-xs">
              <h3 className="text-lg font-bold text-foreground">Hosted by {studio.ownerName}</h3>
              <div className="flex items-center gap-4">
                <Avatar className="size-14 border border-border">
                  <AvatarImage src={studio.ownerAvatar} alt={studio.ownerName} />
                  <AvatarFallback className="bg-orange-500 text-white font-bold text-lg">
                    {studio.ownerName ? studio.ownerName.slice(0, 2) : "SH"}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-foreground">{studio.ownerName}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Mail className="size-3.5" />
                    <span>{studio.ownerEmail}</span>
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    <ShieldCheck className="size-3.5" />
                    <span>StudioSpace Identity Verified Host</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  Creator Reviews
                </h2>
                <div className="flex items-center gap-1 text-sm font-bold text-foreground">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <span>{Number(studio.rating || 5.0).toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground font-normal">
                    ({studio.reviewsCount || 1} total)
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {studio.reviews && studio.reviews.length > 0 ? (
                  studio.reviews.map((rev, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-card border border-border/80 space-y-2 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-foreground">{rev.user}</span>
                        <div className="flex items-center gap-1 text-xs text-amber-500">
                          {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                            <Star key={i} className="size-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        &quot;{rev.comment}&quot;
                      </p>
                      <span className="text-[11px] text-muted-foreground block">{rev.date}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground">No written reviews yet for this workspace.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-3xl bg-card border border-border p-6 shadow-xl space-y-6">
              <div className="flex items-baseline justify-between pb-4 border-b border-border/60">
                <div>
                  <span className="text-3xl font-extrabold text-foreground">${studio.hourlyRate}</span>
                  <span className="text-xs text-muted-foreground ml-1">/ hour</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  <span>{Number(studio.rating || 5.0).toFixed(1)}</span>
                </div>
              </div>

              {/* Assurances list */}
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-3.5 text-emerald-500" />
                  <span>Real-time Double-Booking Prevention</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-3.5 text-emerald-500" />
                  <span>Free cancellation up to 48 hours prior</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-3.5 text-emerald-500" />
                  <span>Instant downloadable PDF booking invoice</span>
                </div>
              </div>

              {/* Book Workspace Button */}
              <Button
                size="lg"
                onClick={() => setIsBookingOpen(true)}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg shadow-orange-500/25 cursor-pointer text-base transition-all hover:scale-[1.01]"
              >
                <CalendarDays className="size-4 mr-2" />
                Book Workspace Now
              </Button>

              <div className="text-center">
                <span className="text-[11px] text-muted-foreground">
                  You won&apos;t be billed until your booking is accepted by the host.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        studio={studio}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}

