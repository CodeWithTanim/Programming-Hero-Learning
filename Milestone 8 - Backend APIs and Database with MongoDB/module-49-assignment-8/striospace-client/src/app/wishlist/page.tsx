"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Studio } from "@/types";
import StudioCard from "@/components/StudioCard";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, Building2 } from "lucide-react";
import { toast } from "sonner";

export default function WishlistPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);

  // Protected route check
  useEffect(() => {
    if (!isPending && !user) {
      toast.error("Please sign in to access your saved studios wishlist.");
      router.push("/login?callbackUrl=/wishlist");
    }
  }, [isPending, user, router]);

  const loadWishlistStudios = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const serverUrl = (process.env.NEXT_PUBLIC_SERVER_API || "http://localhost:8000").replace(/\/+$/, "");
      const res = await fetch(`${serverUrl}/api/wishlist/${encodeURIComponent(user.email)}`, {
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        setStudios(data.studios || []);
      }
    } catch (err) {
      console.error("Wishlist fetch error:", err);
      toast.error("Failed to load wishlist.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      loadWishlistStudios();
    }
  }, [user?.email]);

  const handleWishlistChange = (studioId: string, saved: boolean) => {
    if (!saved) {
      setStudios((prev) => prev.filter((s) => s._id !== studioId));
    }
  };

  const renderStudioCardSkeleton = (key: number) => (
    <div
      key={key}
      className="flex flex-col h-full bg-card rounded-2xl border border-border/80 overflow-hidden shadow-xs animate-pulse"
    >
      {/* 1. Image Container with Aspect Ratio */}
      <div className="relative aspect-[16/10] w-full bg-muted">
        <Skeleton className="w-full h-full rounded-none" />

        {/* Top-left: Category badge pill */}
        <div className="absolute top-3 left-3">
          <Skeleton className="h-5 w-20 rounded-full bg-background/70" />
        </div>

        {/* Top-right: Heart button */}
        <div className="absolute top-3 right-3">
          <Skeleton className="size-8 rounded-full bg-background/70" />
        </div>

        {/* Bottom-right: Rating pill */}
        <div className="absolute bottom-3 right-3">
          <Skeleton className="h-5 w-16 rounded-md bg-black/60" />
        </div>
      </div>

      {/* 2. Body Info */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Title */}
          <Skeleton className="h-5 w-4/5 rounded-md" />

          {/* Location & Capacity */}
          <div className="flex items-center justify-between pt-0.5">
            <Skeleton className="h-3.5 w-36 rounded-md" />
            <Skeleton className="h-3.5 w-16 rounded-md" />
          </div>

          {/* Amenities preview tags */}
          <div className="flex items-center gap-1.5 pt-1">
            <Skeleton className="h-5 w-20 rounded-md" />
            <Skeleton className="h-5 w-20 rounded-md" />
            <Skeleton className="h-5 w-12 rounded-md" />
          </div>
        </div>

        {/* 3. Card Footer */}
        <div className="pt-3 border-t border-border/60 flex items-center justify-between">
          <Skeleton className="h-6 w-16 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );

  if (isPending) {
    return (
      <div className="min-h-screen bg-background py-10 sm:py-14 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
          {/* Header Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-36 rounded-full" />
              <Skeleton className="h-8 w-64 rounded-md" />
              <Skeleton className="h-4 w-80 rounded-md" />
            </div>
            <Skeleton className="h-11 w-48 rounded-xl shrink-0" />
          </div>

          {/* Wishlist Grid Skeletons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Array.from({ length: 6 }).map((_, idx) => renderStudioCardSkeleton(idx))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-10 sm:py-14 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-rose-500">
              <Heart className="size-3.5 fill-rose-500" />
              Creator Favorites
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Saved Studio Workspaces
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Your curated collection of favorite production stages, photo lofts, and podcast suites.
            </p>
          </div>

          <Button
            size="lg"
            className="rounded-xl px-5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-md shadow-orange-500/20 cursor-pointer shrink-0"
            asChild
          >
            <Link href="/studios">
              <Building2 className="size-4 mr-2" />
              Discover More Spaces
            </Link>
          </Button>
        </div>

        {/* Wishlist Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Array.from({ length: 6 }).map((_, idx) => renderStudioCardSkeleton(idx))}
          </div>
        ) : studios.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {studios.map((studio) => (
              <StudioCard
                key={studio._id}
                studio={studio}
                initialSaved={true}
                onWishlistChange={handleWishlistChange}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 px-4 bg-card rounded-3xl border border-border max-w-xl mx-auto space-y-4 shadow-sm">
            <div className="size-16 rounded-2xl bg-rose-500/10 text-rose-500 mx-auto flex items-center justify-center">
              <Heart className="size-8 stroke-[1.8]" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              Your Wishlist is Empty
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
              You haven&apos;t saved any studios yet. Click the heart icon on any workspace card to keep it handy for upcoming productions.
            </p>
            <div className="pt-2">
              <Button
                asChild
                className="rounded-xl px-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold cursor-pointer shadow-md shadow-orange-500/20"
              >
                <Link href="/studios">
                  <ArrowRight className="size-4 mr-1.5" />
                  Explore Studio Spaces
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

