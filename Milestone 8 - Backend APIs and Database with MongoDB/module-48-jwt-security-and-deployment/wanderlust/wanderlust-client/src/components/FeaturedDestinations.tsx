"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Star,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Destination } from "@/components/types";

// Fallback destinations in case API is loading or empty
const fallbackDestinations: Destination[] = [
  {
    _id: "1",
    destinationName: "Bali Paradise",
    country: "Nepal",
    category: "Adventure",
    price: 2700,
    duration: "7 Days/6 Nights",
    rating: 4.5,
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    _id: "2",
    destinationName: "Bali Paradise",
    country: "Indonesia",
    category: "Beach",
    price: 2700,
    duration: "7 Days/6 Nights",
    rating: 4.5,
    imageUrl:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    _id: "3",
    destinationName: "Sajek Valley",
    country: "Bangladesh",
    category: "Nature",
    price: 6500,
    duration: "3 Days/2 Nights",
    rating: 4.8,
    imageUrl:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    _id: "4",
    destinationName: "Sundarbans",
    country: "Bangladesh",
    category: "Wildlife",
    price: 8500,
    duration: "4 Days/3 Nights",
    rating: 4.6,
    imageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    _id: "5",
    destinationName: "Bandarban",
    country: "Bangladesh",
    category: "Adventure",
    price: 7000,
    duration: "4 Days/3 Nights",
    rating: 4.7,
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
  },
];

interface FeaturedDestinationsProps {
  initialDestinations?: Destination[];
}

export default function FeaturedDestinations({
  initialDestinations,
}: FeaturedDestinationsProps) {
  const [destinations, setDestinations] = useState<Destination[]>(
    initialDestinations && initialDestinations.length > 0
      ? initialDestinations
      : []
  );
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(5);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // Fetch from API if initialDestinations wasn't provided or empty
  useEffect(() => {
    if (initialDestinations && initialDestinations.length > 0) {
      setDestinations(initialDestinations);
      return;
    }

    const fetchFeatured = async () => {
      const serverUrl =
        process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";
      try {
        const res = await fetch(`${serverUrl}/featured-destinations`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setDestinations(data);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch featured destinations:", err);
      }
      // fallback if API fails
      setDestinations(fallbackDestinations);
    };

    fetchFeatured();
  }, [initialDestinations]);

  const displayList =
    destinations.length > 0 ? destinations : fallbackDestinations;

  // Manage Carousel state
  useEffect(() => {
    if (!api) return;

    const snapCount = api.scrollSnapList().length || displayList.length;
    setCount(snapCount);
    setCurrent(api.selectedScrollSnap() + 1);
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());

    const updateState = () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    api.on("select", updateState);
    api.on("reInit", updateState);

    return () => {
      api.off("select", updateState);
      api.off("reInit", updateState);
    };
  }, [api, displayList.length]);

  const formatDuration = (val?: string | number) => {
    if (!val) return "7 Days/6 Nights";
    const str = String(val).trim();
    if (
      str.toLowerCase().includes("day") ||
      str.toLowerCase().includes("night")
    ) {
      return str;
    }
    const num = parseInt(str, 10);
    if (!isNaN(num) && num > 0) {
      const nights = Math.max(1, num - 1);
      return `${num} Days/${nights} Nights`;
    }
    return str;
  };

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-normal text-[#0c0b0b] tracking-tight leading-tight">
              Featured Destinations
            </h2>
            <p className="text-[#6c696d] text-sm sm:text-base mt-2 font-normal">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Link
            href="/destinations"
            className="inline-flex items-center justify-center gap-2 border border-[#15a1bf] text-[#15a1bf] hover:bg-[#15a1bf] hover:text-white px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors rounded-none shrink-0 self-start sm:self-end"
          >
            <span>ALL DESTINATIONS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Carousel Content */}
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-6">
            {displayList.map((item, index) => {
              const formattedDuration = formatDuration(item.duration);
              const price = item.price ?? 2700;
              const rating = item.rating ?? 4.5;
              const locationName = item.country || "Nepal";

              return (
                <CarouselItem
                  key={item._id || index}
                  className="pl-6 basis-full sm:basis-[48%] lg:basis-[46%]"
                >
                  <div className="group flex flex-col">
                    {/* Destination Image Box */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-100">
                      <Image
                        src={
                          item.imageUrl ||
                          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
                        }
                        alt={item.destinationName}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 46vw"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />

                      {/* Rating Badge */}
                      <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-xs px-2.5 py-1 flex items-center gap-1 shadow-xs">
                        <span className="text-xs sm:text-[13px] font-semibold text-[#121212] tracking-tight">
                          {rating}
                        </span>
                        <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#0c0b0b] text-[#0c0b0b]" />
                      </div>
                    </div>

                    {/* Destination Details Below Image */}
                    <div className="pt-4 flex flex-col gap-2">
                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-neutral-500">
                        <MapPin className="w-4 h-4 text-[#6c696d] stroke-[1.8] shrink-0" />
                        <span className="text-xs sm:text-sm font-medium text-[#6c696d]">
                          {locationName}
                        </span>
                      </div>

                      {/* Title & Price Row */}
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="text-2xl sm:text-[26px] font-serif font-normal text-[#0c0b0b] truncate">
                          {item.destinationName}
                        </h3>
                        <div className="shrink-0 flex items-baseline">
                          <span className="text-2xl sm:text-[26px] font-serif font-medium text-[#0c0b0b]">
                            ${price}
                          </span>
                          <span className="text-xs sm:text-sm text-[#6c696d] font-normal ml-0.5">
                            /Person
                          </span>
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="flex items-center gap-1.5 text-neutral-500">
                        <Calendar className="w-4 h-4 text-[#6c696d] stroke-[1.8] shrink-0" />
                        <span className="text-xs sm:text-sm text-[#6c696d] font-normal">
                          {formattedDuration}
                        </span>
                      </div>

                      {/* Book Now Button */}
                      <div className="pt-1">
                        <Link
                          href={`/destinations/${item._id || ""}`}
                          className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold tracking-wider text-[#15a1bf] hover:text-[#128ca6] transition-colors uppercase group/btn"
                        >
                          <span className="border-b border-[#15a1bf] pb-[1px]">
                            BOOK NOW
                          </span>
                          <ArrowUpRight className="w-4 h-4 stroke-[2.2] transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        {/* Bottom Pagination & Navigation Controls */}
        <div className="mt-8 sm:mt-10 flex items-center justify-between">
          {/* Slide Indicator (e.g. 1/5) */}
          <span className="font-serif text-lg sm:text-xl text-[#0c0b0b] min-w-[36px]">
            {current}/{count || displayList.length}
          </span>

          {/* Progress Bar Track */}
          <div className="flex-1 mx-4 sm:mx-8 h-[1.5px] bg-neutral-200 relative overflow-hidden">
            <div
              className="h-full bg-neutral-900 transition-all duration-300"
              style={{
                width: `${(current / (count || displayList.length)) * 100}%`,
              }}
            />
          </div>

          {/* Arrow Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              disabled={!canScrollPrev}
              aria-label="Previous destination"
              className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:border-neutral-900 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 stroke-[1.5]" />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Next destination"
              className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:border-neutral-900 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

