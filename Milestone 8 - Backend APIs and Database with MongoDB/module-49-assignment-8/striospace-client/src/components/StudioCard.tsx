"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, MapPin, Heart, ArrowUpRight, Users } from "lucide-react";
import { Studio } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

interface StudioCardProps {
  studio: Studio;
  initialSaved?: boolean;
  onWishlistChange?: (studioId: string, saved: boolean) => void;
}

export default function StudioCard({
  studio,
  initialSaved = false,
  onWishlistChange,
}: StudioCardProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isSaving, setIsSaving] = useState(false);

  // Sync state dynamically when async wishlistIds loads
  React.useEffect(() => {
    setIsSaved(Boolean(initialSaved));
  }, [initialSaved]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Photo Studio":
        return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20";
      case "Film Stage":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "Podcast Lounge":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      case "Music Suite":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "Art Workshop":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user) {
      toast.error("Please log in to save spaces to your wishlist.");
      router.push("/login");
      return;
    }

    setIsSaving(true);
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
          studioId: studio._id,
          userEmail: session?.user?.email 
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setIsSaved(data.saved);
        if (data.saved) {
          toast.success(`Saved "${studio.title}" to your wishlist!`);
        } else {
          toast.info(`Removed "${studio.title}" from wishlist.`);
        }
        if (onWishlistChange) {
          onWishlistChange(studio._id, data.saved);
        }
      } else {
        toast.error("Failed to update wishlist. Please ensure you are logged in.");
      }
    } catch (err) {
      console.error("Wishlist error:", err);
      toast.error("Network error updating wishlist.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="group flex flex-col h-full bg-card rounded-2xl border border-border/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image Container with Uniform Aspect Ratio */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <img
          src={studio.imageUrl || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80"}
          alt={studio.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Category Badge overlay */}
        <div className="absolute top-3 left-3">
          <Badge
            variant="outline"
            className={`text-xs font-semibold backdrop-blur-md px-2.5 py-0.5 rounded-full border shadow-xs ${getCategoryColor(
              studio.category
            )}`}
          >
            {studio.category}
          </Badge>
        </div>

        {/* Wishlist Heart Button (Optional Requirement 2) */}
        <button
          onClick={handleToggleWishlist}
          disabled={isSaving}
          className={`absolute top-3 right-3 size-9 rounded-full backdrop-blur-md flex items-center justify-center transition-transform active:scale-90 shadow-md ${
            isSaved
              ? "bg-rose-500 text-white"
              : "bg-background/80 text-muted-foreground hover:text-rose-500 hover:bg-background"
          }`}
          title={isSaved ? "Remove from wishlist" : "Save to wishlist"}
          aria-label="Wishlist button"
        >
          <Heart className={`size-4.5 ${isSaved ? "fill-current" : ""}`} />
        </button>

        {/* Rating Badge */}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1 shadow-xs">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <span>{Number(studio.rating || 5.0).toFixed(1)}</span>
          <span className="text-white/70 text-[10px]">({studio.reviewsCount || 1})</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-base sm:text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          <Link href={`/studios/${studio._id}`} className="hover:underline">
            {studio.title}
          </Link>
        </h3>

        {/* Location & Capacity */}
        <div className="flex items-center justify-between text-xs text-muted-foreground gap-2">
          <div className="flex items-center gap-1 truncate">
            <MapPin className="size-3.5 text-orange-500 shrink-0" />
            <span className="truncate">{studio.location}</span>
          </div>
          {studio.maxCapacity && (
            <div className="flex items-center gap-1 shrink-0 text-muted-foreground">
              <Users className="size-3.5" />
              <span>Up to {studio.maxCapacity}</span>
            </div>
          )}
        </div>

        {/* Amenities Preview */}
        {studio.amenities && studio.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {studio.amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-muted/60 text-muted-foreground px-2 py-0.5 rounded-md"
              >
                {amenity}
              </span>
            ))}
            {studio.amenities.length > 3 && (
              <span className="text-[11px] text-muted-foreground px-1 py-0.5">
                +{studio.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Card Footer: Hourly Rate & View Details */}
        <div className="pt-3 mt-auto border-t border-border/60 flex items-center justify-between gap-3">
          <div>
            <span className="text-xl font-bold text-foreground">
              ${studio.hourlyRate}
            </span>
            <span className="text-xs text-muted-foreground ml-1">/ hr</span>
          </div>

          <Button
            size="sm"
            variant="default"
            className="rounded-xl px-3.5 font-medium bg-foreground text-background hover:bg-foreground/90 dark:bg-primary dark:text-primary-foreground group/btn cursor-pointer transition-all shadow-xs"
            asChild
          >
            <Link href={`/studios/${studio._id}`}>
              <span>View Details</span>
              <ArrowUpRight className="size-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

