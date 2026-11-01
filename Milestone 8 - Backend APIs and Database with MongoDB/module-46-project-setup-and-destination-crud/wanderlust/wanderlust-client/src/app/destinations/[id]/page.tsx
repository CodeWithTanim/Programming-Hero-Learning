import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Calendar,
  Star,
  Check,
  Pencil,
  Trash2,
} from "lucide-react";

import EditDestinationDialogue from "@/components/EditDestinationDialogue";
import DeleteDestinationDialog from "@/components/DeleteDestinationDialog";
import { Destination } from "@/components/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function DestinationDetailsPage({ params }: PageProps) {
  const { id } = await params;

  let destination: Destination | null = null;

  try {
    const res = await fetch(`http://localhost:8000/destination/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      destination = await res.json();
    }
  } catch (err) {
    console.error("Could not fetch destination from server:", err);
  }

  // Fallback data matching the Penpot design if destination is not found or mock id used
  const destinationName = destination?.destinationName || "Bali Paradise";
  const country = destination?.country || "Indonesia";
  const price = destination?.price || "1299";
  const rawDuration = destination?.duration || "7 Days / 6 Nights";
  const duration =
    String(rawDuration).toLowerCase().includes("day") ||
    String(rawDuration).toLowerCase().includes("night")
      ? String(rawDuration)
      : `${rawDuration} Days / 6 Nights`;
  const departureDate = destination?.departureDate || "05/15/2026";
  const imageUrl =
    destination?.imageUrl?.trim() || "/assets/destinations/image1.png";
  const description =
    destination?.description ||
    "Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.";

  const highlights = [
    "Luxury beachfront accommodation",
    "Visit Uluwatu Temple at sunset",
    "Traditional Balinese spa treatment",
    "Private beach dinner experience",
    "Sunrise trek to Mount Batur",
  ];

  return (
    <div className="w-full bg-white min-h-[calc(100vh-160px)] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto">
        {/* Top Action Bar (Back Link & Edit / Cancel Buttons) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-normal text-[#6c696d] hover:text-[#0c0b0b] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Destinations</span>
          </Link>

          <div className="flex items-center gap-3">
            <EditDestinationDialogue destination={destination} />
            <DeleteDestinationDialog id={id} destinationName={destinationName} />
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-[300px] sm:h-[420px] lg:h-[500px] overflow-hidden bg-neutral-100">
          <Image
            src={imageUrl}
            alt={destinationName}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            unoptimized
          />
        </div>

        {/* Horizontal Divider Line */}
        <div className="w-full border-b border-[#eeeeee] my-8 sm:my-10" />

        {/* Two-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (Details, Overview, Highlights) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Header Block: Location, Title, Rating, Duration */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-neutral-500">
                <MapPin className="w-4 h-4 text-[#6c696d] stroke-[1.8]" />
                <span className="text-sm font-medium text-[#6c696d]">
                  {country}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#0c0b0b] tracking-tight">
                {destinationName}
              </h1>

              <div className="flex flex-wrap items-center gap-6 pt-1 text-sm">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                  <span className="font-semibold text-[#0c0b0b]">
                    {destination?.rating ?? 4.9}
                  </span>
                  <span className="text-[#6c696d]">(234 reviews)</span>
                </div>

                <div className="flex items-center gap-1.5 text-[#0c0b0b]">
                  <Calendar className="w-4 h-4 text-[#6c696d] stroke-[1.8]" />
                  <span className="font-medium text-[#0c0b0b]">{duration}</span>
                </div>
              </div>
            </div>

            {/* Overview Section */}
            <div className="space-y-3 pt-2">
              <h2 className="text-2xl font-serif font-normal text-[#0c0b0b]">
                Overview
              </h2>
              <p className="text-[#6c696d] text-base leading-relaxed">
                {description}
              </p>
            </div>

            {/* Highlights Section */}
            <div className="space-y-4 pt-2">
              <h2 className="text-2xl font-serif font-normal text-[#0c0b0b]">
                Highlights
              </h2>
              <p className="text-[#6c696d] text-base leading-relaxed">
                {description}
              </p>

              {/* Highlights Checklist (2 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 pt-2">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-sm text-[#0c0b0b]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar Booking Card) */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-[#eeeeee] shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-8 space-y-6 lg:sticky lg:top-24">
              {/* Price Header */}
              <div className="space-y-1">
                <p className="text-sm text-[#6c696d]">Starting from</p>
                <p className="text-3xl sm:text-4xl font-serif font-bold text-[#15a1bf]">
                  ${price}
                </p>
                <p className="text-xs sm:text-sm text-[#6c696d]">per person</p>
              </div>

              {/* Departure Date Display Box */}
              <div className="w-full bg-[#f8f9fa] border border-[#e5e7eb] px-4 py-3 text-sm text-[#0c0b0b] font-medium">
                {departureDate}
              </div>

              {/* Book Now Action Button */}
              <button
                type="button"
                className="w-full bg-[#15a1bf] hover:bg-[#128ca6] text-white py-3.5 px-6 font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
              >
                <span>Book Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Trust Guarantees */}
              <div className="space-y-3 pt-2 text-xs sm:text-sm text-[#6c696d]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free cancellation up to 7 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Travel insurance included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>24/7 customer support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
