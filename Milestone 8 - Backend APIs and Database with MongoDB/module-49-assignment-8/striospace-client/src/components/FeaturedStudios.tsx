"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Studio } from "@/types";
import StudioCard from "@/components/StudioCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function FeaturedStudios() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    async function fetchFeatured() {
      try {
        setLoading(true);
        const serverUrl = (process.env.NEXT_PUBLIC_SERVER_API || "http://localhost:8000").replace(/\/+$/, "");
        // Fetch dynamically from MongoDB with .limit(6)
        const res = await fetch(`${serverUrl}/api/studios?featured=true&limit=6`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch featured studio workspaces");
        }

        const data: Studio[] = await res.json();
        setStudios(data);
      } catch (err: any) {
        console.error("Featured studios fetch error:", err);
        setError("Unable to load featured studios at this time. Please make sure the server is running.");
      } finally {
        setLoading(false);
      }
    }

    fetchFeatured();
  }, []);

  // Fetch wishlist if user is authenticated
  useEffect(() => {
    if (!session?.user?.email) return;

    async function fetchWishlist() {
      try {
        const serverUrl = (process.env.NEXT_PUBLIC_SERVER_API || "http://localhost:8000").replace(/\/+$/, "");
        const res = await fetch(`${serverUrl}/api/wishlist/${encodeURIComponent(session?.user?.email || "")}`);
        if (res.ok) {
          const data = await res.json();
          const cleanIds = (data.studioIds || []).map((id: any) => String(id));
          setWishlistIds(cleanIds);
        }
      } catch (err) {
        console.error("Wishlist fetch error:", err);
      }
    }

    fetchWishlist();
  }, [session?.user?.email]);

  return (
    <section className="py-16 sm:py-24 bg-background transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-orange-500 mb-2">
              <span className="size-2 rounded-full bg-orange-500" />
              Verified Top-Tier Spaces
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Featured Studio Spaces
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-xl">
              Handpicked production studios, daylight ateliers, and acoustic mastering stages trusted by leading independent artists and production teams.
            </p>
          </div>

          <Button
            variant="outline"
            className="rounded-xl border-border hover:bg-muted font-medium shrink-0 cursor-pointer"
            asChild
          >
            <Link href="/studios" className="flex items-center gap-1.5">
              <span>Explore All Studios</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Loading State with Branded Skeleton Loaders */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-card rounded-2xl border border-border p-4 space-y-4 overflow-hidden"
              >
                <Skeleton className="w-full aspect-[16/10] rounded-xl" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-24 rounded-full" />
                    <Skeleton className="h-5 w-12 rounded-md" />
                  </div>
                  <Skeleton className="h-6 w-3/4 rounded-md" />
                  <Skeleton className="h-4 w-1/2 rounded-md" />
                </div>
                <div className="pt-4 flex justify-between items-center border-t border-border/60">
                  <Skeleton className="h-7 w-20 rounded-md" />
                  <Skeleton className="h-8 w-24 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="p-8 text-center rounded-2xl border border-destructive/20 bg-destructive/5 text-destructive max-w-lg mx-auto space-y-3">
            <AlertCircle className="size-8 mx-auto" />
            <p className="font-semibold text-sm">{error}</p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.location.reload()}
              className="rounded-lg"
            >
              Retry
            </Button>
          </div>
        )}

        {/* Featured Studios Grid */}
        {!loading && !error && studios.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {studios.map((studio) => (
              <StudioCard
                key={studio._id}
                studio={studio}
                initialSaved={wishlistIds.includes(String(studio._id))}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && studios.length === 0 && (
          <div className="text-center py-16 px-4 bg-muted/30 rounded-2xl border border-border">
            <p className="text-muted-foreground text-sm">
              No studios currently listed. Be the first host to list your creative space!
            </p>
            <Button className="mt-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white" asChild>
              <Link href="/add-studio">Host a Space</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

