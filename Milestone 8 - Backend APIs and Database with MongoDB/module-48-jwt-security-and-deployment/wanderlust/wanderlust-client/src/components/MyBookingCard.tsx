'use client'

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { MyBookingCardProps } from "@/components/types";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const MyBookingCard = ({ booking }: MyBookingCardProps) => {
  const router = useRouter();

  const handleCancleBooking = async () => {
    try {
      const token = await getTokenFromClient();
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";
      const res = await fetch(`${serverUrl}/my-bookings/${booking._id}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      console.log(data);
      if (data.deletedCount > 0) {
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to cancel booking:", err);
    }
  };

  // Destination Name
  const destinationName = booking.destinationName || "Bali Paradise";

  // Price formatting
  const price = booking.price || "1299";

  // Departure date formatting
  const formatDepartureDate = (dateVal?: string) => {
    if (!dateVal) return "May 15, 2026";
    if (/[a-zA-Z]/.test(dateVal)) return dateVal;
    try {
      const parsed = new Date(dateVal);
      if (!isNaN(parsed.getTime())) {
        return format(parsed, "MMMM d, yyyy");
      }
    } catch (_) {}
    return dateVal;
  };

  const departureDate = formatDepartureDate(booking.departureDate);

  // Booking ID formatting
  const bookingId = booking._id
    ? `b${booking._id.slice(-2)}`
    : "b1";

  // Status badge styling
  const status = booking.status || "Confirmed";
  const isConfirmed = status.toLowerCase() === "confirmed";
  const isPending = status.toLowerCase() === "pending";

  // Destination image fallback
  const imageUrl =
    booking.imageUrl || "/assets/destinations/image1.png";

  return (
    <div className="bg-white border border-[#eeeeee] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-shadow">
      {/* Left Column: Image and Details */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full md:w-auto flex-1">
        {/* Destination Image */}
        <div className="w-full sm:w-[320px] lg:w-[380px] h-[200px] sm:h-[220px] relative overflow-hidden bg-neutral-100 shrink-0">
          <Image
            src={imageUrl}
            alt={destinationName}
            fill
            sizes="(max-width: 640px) 100vw, 380px"
            className="object-cover object-center"
            unoptimized
          />
        </div>

        {/* Info Column */}
        <div className="space-y-3 flex-1 min-w-0">
          {/* Status Badge */}
          {isConfirmed ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ecfdf5] text-[#10b981] text-xs font-medium rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Confirmed</span>
            </div>
          ) : isPending ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fffbeb] text-[#f59e0b] text-xs font-medium rounded-full">
              <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Pending</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fef2f2] text-[#ef4444] text-xs font-medium rounded-full">
              <XCircle className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{status}</span>
            </div>
          )}

          {/* Destination Title */}
          <h2 className="font-serif text-2xl sm:text-[28px] font-normal text-[#0c0b0b] tracking-tight leading-tight truncate">
            {destinationName}
          </h2>

          {/* Meta Details */}
          <div className="space-y-1.5 text-sm text-[#6c696d]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#6c696d] stroke-[1.8]" />
              <span>Departure: {departureDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#6c696d] stroke-[1.8]" />
              <span>Booking ID: {bookingId}</span>
            </div>
          </div>

          {/* Price */}
          <div className="pt-1">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#15a1bf]">
              ${price}
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Action Buttons */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-end shrink-0 self-end md:self-end pt-2 md:pt-0">
        <button onClick={handleCancleBooking}
          type="button"
          className="inline-flex items-center justify-center gap-2 px-5 h-11 border border-[#ef4444] bg-white text-[#ef4444] hover:bg-[#fef2f2] text-sm font-medium transition-colors cursor-pointer rounded-none"
        >
          <Trash2 className="w-4 h-4 text-[#ef4444]" />
          <span>Cancel</span>
        </button>

        <Link
          href={
            booking.destinationId
              ? `/destinations/${booking.destinationId}`
              : "/destinations"
          }
          className="inline-flex items-center justify-center gap-2 px-6 h-11 bg-[#15a1bf] hover:bg-[#128ca6] text-white text-sm font-semibold transition-colors cursor-pointer rounded-none"
        >
          <Eye className="w-4 h-4 text-white" />
          <span>View</span>
        </Link>
      </div>
    </div>
  );
};

export default MyBookingCard;

