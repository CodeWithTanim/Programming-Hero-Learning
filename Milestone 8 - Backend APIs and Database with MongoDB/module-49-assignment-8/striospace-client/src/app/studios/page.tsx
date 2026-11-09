"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Studio } from "@/types";
import StudioCard from "@/components/StudioCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  Building2, 
  ArrowUpDown,
  Filter
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const categories = [
  "All",
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Art Workshop",
];

function StudiosContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";

  const [studios, setStudios] = useState<Studio[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [sortBy, setSortBy] = useState("newest");

  const { data: session } = authClient.useSession();

  // Handle URL category sync
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 350);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch studios
  useEffect(() => {
    async function loadStudios() {
      try {
        setLoading(true);
        const serverUrl = (process.env.NEXT_PUBLIC_SERVER_API || "http://localhost:8000").replace(/\/+$/, "");
        const params = new URLSearchParams();

        if (selectedCategory && selectedCategory !== "All") {
          params.set("category", selectedCategory);
        }
        if (debouncedSearch) {
          params.set("search", debouncedSearch);
        }
        if (sortBy) {
          params.set("sort", sortBy);
        }

        const res = await fetch(`${serverUrl}/api/studios?${params.toString()}`, {
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          setStudios(data);
        }
      } catch (err) {
        console.error("Failed to fetch studios:", err);
      } finally {
        setLoading(false);
      }
    }

    loadStudios();
  }, [selectedCategory, debouncedSearch, sortBy]);

  // Fetch user's wishlist
  useEffect(() => {
    if (!session?.user?.email) return;

    async function loadWishlist() {
      try {
        const serverUrl = (process.env.NEXT_PUBLIC_SERVER_API || "http://localhost:8000").replace(/\/+$/, "");
        const res = await fetch(`${serverUrl}/api/wishlist/${encodeURIComponent(session?.user?.email || "")}`);
        if (res.ok) {
          const data = await res.json();
          const cleanIds = (data.studioIds || []).map((id: any) => String(id));
          setWishlistIds(cleanIds);
        }
      } catch (err) {
        console.error("Wishlist error:", err);
      }
    }

    loadWishlist();
  }, [session?.user?.email]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === "All") {
      router.push("/studios");
    } else {
      router.push(`/studios?category=${encodeURIComponent(cat)}`);
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setDebouncedSearch("");
    setSortBy("newest");
    router.push("/studios");
  };

  return (
    <div className="min-h-screen bg-background py-10 sm:py-14 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Title & Intro */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-orange-500">
            <Building2 className="size-3.5" />
            Live Marketplace Catalog
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Explore Creative Studios
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Filter certified photography lofts, cinematic sound stages, podcast studios, and sound suites with transparent hourly rates and instant reservations.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="bg-card rounded-2xl border border-border p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search studios by title, location, or equipment (e.g. cyclorama, Neve, daylight)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-background text-sm rounded-xl border-border focus-visible:ring-1 focus-visible:ring-orange-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-11 px-3.5 pr-8 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer appearance-none"
                  aria-label="Sort studios"
                >
                  <option value="newest">Sort: Newest Listed</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating_desc">Highest Rated</option>
                </select>
                <ArrowUpDown className="size-3.5 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {(selectedCategory !== "All" || searchQuery) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetFilters}
                  className="h-11 rounded-xl px-3 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                  title="Reset all filters"
                >
                  <RotateCcw className="size-3.5 mr-1" />
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 shrink-0 mr-1">
              <Filter className="size-3.5" />
              Category:
            </span>
            {categories.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? "bg-orange-500 text-white shadow-sm shadow-orange-500/20"
                      : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
          <p>
            Showing <span className="font-semibold text-foreground">{studios.length}</span>{" "}
            creative workspace{studios.length === 1 ? "" : "s"}
            {selectedCategory !== "All" && (
              <span>
                {" "}
                in <span className="font-semibold text-orange-500">{selectedCategory}</span>
              </span>
            )}
            {debouncedSearch && (
              <span>
                {" "}
                matching &quot;<span className="font-semibold text-foreground">{debouncedSearch}</span>&quot;
              </span>
            )}
          </p>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-card rounded-2xl border border-border p-4 space-y-4"
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

        {/* Studio Cards Grid */}
        {!loading && studios.length > 0 && (
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

        {/* Friendly Empty State */}
        {!loading && studios.length === 0 && (
          <div className="text-center py-20 px-4 bg-card rounded-3xl border border-border max-w-xl mx-auto space-y-4 shadow-xs">
            <div className="size-16 rounded-2xl bg-orange-500/10 text-orange-500 mx-auto flex items-center justify-center">
              <Search className="size-8 stroke-[1.8]" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              No matching studios found
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
              We couldn&apos;t find any creative spaces matching your current search criteria. Try modifying your filters or view all available studios.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Button
                onClick={handleResetFilters}
                className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium cursor-pointer"
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function StudiosPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16">
          <Skeleton className="h-10 w-64 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={idx} className="h-80 rounded-2xl" />
            ))}
          </div>
        </div>
      }
    >
      <StudiosContent />
    </Suspense>
  );
}

