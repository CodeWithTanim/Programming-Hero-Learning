"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, ArrowUpRight, Star, ChevronDown, RotateCcw } from "lucide-react";
import { Destination, DestinationsViewProps } from "@/components/types";

export type { Destination, DestinationsViewProps };

export default function DestinationsView({ initialDestinations }: DestinationsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("ALL");
  const [selectedSortBy, setSelectedSortBy] = useState<string>("DEFAULT");

  // Extract distinct categories from destination data
  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    initialDestinations.forEach((item) => {
      if (item.category) {
        cats.add(item.category.trim());
      }
    });
    return Array.from(cats);
  }, [initialDestinations]);

  // Filter and sort destinations
  const filteredDestinations = useMemo(() => {
    return initialDestinations
      .filter((item) => {
        // Category filter
        if (selectedCategory !== "ALL") {
          if (!item.category || item.category.toLowerCase() !== selectedCategory.toLowerCase()) {
            return false;
          }
        }

        // Price range filter
        const priceNum = Number(String(item.price).replace(/[^0-9.]/g, "")) || 0;
        if (selectedPriceRange === "under-3000") {
          if (priceNum >= 3000) return false;
        } else if (selectedPriceRange === "3000-6000") {
          if (priceNum < 3000 || priceNum > 6000) return false;
        } else if (selectedPriceRange === "6000-8000") {
          if (priceNum < 6000 || priceNum > 8000) return false;
        } else if (selectedPriceRange === "above-8000") {
          if (priceNum <= 8000) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = Number(String(a.price).replace(/[^0-9.]/g, "")) || 0;
        const priceB = Number(String(b.price).replace(/[^0-9.]/g, "")) || 0;

        if (selectedSortBy === "price-asc") {
          return priceA - priceB;
        }
        if (selectedSortBy === "price-desc") {
          return priceB - priceA;
        }
        if (selectedSortBy === "name-asc") {
          return a.destinationName.localeCompare(b.destinationName);
        }
        if (selectedSortBy === "duration") {
          const durA = parseInt(String(a.duration)) || 0;
          const durB = parseInt(String(b.duration)) || 0;
          return durB - durA;
        }
        return 0;
      });
  }, [initialDestinations, selectedCategory, selectedPriceRange, selectedSortBy]);

  const handleResetFilters = () => {
    setSelectedCategory("ALL");
    setSelectedPriceRange("ALL");
    setSelectedSortBy("DEFAULT");
  };

  return (
    <div className="w-full bg-white min-h-[calc(100vh-160px)] py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto">
        {/* Page Header */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-serif font-normal text-[#0c0b0b] tracking-tight leading-tight">
            Explore All Destinations
          </h1>
          <p className="mt-2.5 sm:mt-3 text-base sm:text-lg lg:text-[20px] text-[#6c696d] font-light leading-relaxed">
            Find your perfect travel experience from our curated collection
          </p>
        </div>

        {/* Filter Bar (3 Equal Sections with Borders) */}
        <div className="w-full border border-[#b6b6b6] bg-white grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#b6b6b6] mb-4">
          {/* 1. Category Filter */}
          <div className="relative h-14 flex items-center px-6 hover:bg-neutral-50/60 transition-colors">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter by category"
              className="w-full h-full appearance-none bg-transparent text-[13px] sm:text-[14px] font-medium tracking-wider text-[#0c0b0b] uppercase outline-none cursor-pointer pr-8"
            >
              <option value="ALL">CATEGORY</option>
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.toUpperCase()}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-6 w-4 h-4 text-[#6c696d] pointer-events-none stroke-[2]" />
          </div>

          {/* 2. Price Range Filter */}
          <div className="relative h-14 flex items-center px-6 hover:bg-neutral-50/60 transition-colors">
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              aria-label="Filter by price range"
              className="w-full h-full appearance-none bg-transparent text-[13px] sm:text-[14px] font-medium tracking-wider text-[#0c0b0b] uppercase outline-none cursor-pointer pr-8"
            >
              <option value="ALL">PRICE RANGE</option>
              <option value="under-3000">UNDER $3,000</option>
              <option value="3000-6000">$3,000 - $6,000</option>
              <option value="6000-8000">$6,000 - $8,000</option>
              <option value="above-8000">ABOVE $8,000</option>
            </select>
            <ChevronDown className="absolute right-6 w-4 h-4 text-[#6c696d] pointer-events-none stroke-[2]" />
          </div>

          {/* 3. Sort By Filter */}
          <div className="relative h-14 flex items-center px-6 hover:bg-neutral-50/60 transition-colors">
            <select
              value={selectedSortBy}
              onChange={(e) => setSelectedSortBy(e.target.value)}
              aria-label="Sort destinations"
              className="w-full h-full appearance-none bg-transparent text-[13px] sm:text-[14px] font-medium tracking-wider text-[#0c0b0b] uppercase outline-none cursor-pointer pr-8"
            >
              <option value="DEFAULT">SORT BY</option>
              <option value="price-asc">PRICE: LOW TO HIGH</option>
              <option value="price-desc">PRICE: HIGH TO LOW</option>
              <option value="name-asc">NAME: A TO Z</option>
              <option value="duration">DURATION</option>
            </select>
            <ChevronDown className="absolute right-6 w-4 h-4 text-[#6c696d] pointer-events-none stroke-[2]" />
          </div>
        </div>

        {/* Counter & Active Filter Indicators */}
        <div className="flex items-center justify-between mb-8 sm:mb-10 text-[15px] text-[#6c696d]">
          <p>Showing {filteredDestinations.length} destinations</p>
          {(selectedCategory !== "ALL" || selectedPriceRange !== "ALL" || selectedSortBy !== "DEFAULT") && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 text-xs text-[#15a1bf] hover:underline font-medium cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Destinations Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12">
            {filteredDestinations.map((destination, index) => {
              // Fallback image cycling if no image or broken URL
              const fallbackImages = [
                "/assets/destinations/image1.png",
                "/assets/destinations/image2.png",
                "/assets/destinations/image3.png",
                "/assets/destinations/image4.png",
                "/assets/destinations/image5.png",
                "/assets/destinations/image6.png",
              ];
              const imageSrc = destination.imageUrl?.trim() || fallbackImages[index % fallbackImages.length];

              // Format duration
              const durationString = String(destination.duration || "");
              const formattedDuration =
                durationString.toLowerCase().includes("day") || durationString.toLowerCase().includes("night")
                  ? durationString
                  : `${durationString} Days/6 Nights`;

              return (
                <div
                  key={destination._id || index}
                  className="group flex flex-col bg-white overflow-hidden"
                >
                  {/* Card Image Frame with Floating Rating */}
                  <div className="relative w-full h-[231px] bg-neutral-100 overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={destination.destinationName}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />

                    {/* Floating Rating Badge */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/75 backdrop-blur-xs px-2.5 py-1 flex items-center gap-1.5 shadow-xs">
                      <span className="text-xs sm:text-[13px] font-semibold text-[#121212] tracking-tight">
                        {destination.rating ?? 4.5}
                      </span>
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-black text-black" />
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="pt-4 flex flex-col gap-2">
                    {/* Location Row */}
                    <div className="flex items-center gap-1.5 text-neutral-500">
                      <MapPin className="w-4 h-4 text-[#6c696d] stroke-[1.8] shrink-0" />
                      <span className="text-sm font-medium text-[#6c696d]">
                        {destination.country || "Nepal"}
                      </span>
                    </div>

                    {/* Title & Price Row */}
                    <div className="flex items-baseline justify-between gap-3">
                      <h2 className="text-2xl sm:text-[26px] font-serif font-normal text-[#0c0b0b] truncate">
                        {destination.destinationName}
                      </h2>
                      <div className="shrink-0 flex items-baseline">
                        <span className="text-2xl sm:text-[26px] font-serif font-medium text-[#0c0b0b]">
                          ${destination.price}
                        </span>
                        <span className="text-xs sm:text-sm text-[#6c696d] font-normal ml-0.5">
                          /Person
                        </span>
                      </div>
                    </div>

                    {/* Duration Row */}
                    <div className="flex items-center gap-1.5 text-neutral-500">
                      <Calendar className="w-4 h-4 text-[#6c696d] stroke-[1.8] shrink-0" />
                      <span className="text-sm text-[#6c696d] font-normal">
                        {formattedDuration}
                      </span>
                    </div>

                    {/* Book Now Link */}
                    <div className="pt-1">
                      <Link
                        href={`/destinations/${destination._id}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold tracking-wider text-[#15a1bf] hover:text-[#128ca6] transition-colors uppercase group/btn"
                      >
                        <span className="border-b border-[#15a1bf] pb-[1px]">
                          BOOK NOW
                        </span>
                        <ArrowUpRight className="w-4 h-4 stroke-[2.2] transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center justify-center border border-dashed border-neutral-200 p-8">
            <p className="text-lg font-medium text-neutral-700">No destinations match your filters</p>
            <p className="text-sm text-neutral-500 mt-1">Try resetting the filter criteria to see all destinations.</p>
            <button
              onClick={handleResetFilters}
              className="mt-5 px-5 py-2.5 bg-[#15a1bf] hover:bg-[#128ca6] text-white text-sm font-medium tracking-wide uppercase transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

