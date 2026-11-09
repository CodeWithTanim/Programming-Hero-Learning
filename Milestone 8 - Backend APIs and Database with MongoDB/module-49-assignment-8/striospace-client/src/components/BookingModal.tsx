"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Studio } from "@/types";
import { authClient } from "@/lib/auth-client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Calendar, Clock, DollarSign, ShieldAlert, AlertCircle } from "lucide-react";

interface BookingModalProps {
  studio: Studio;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ studio, isOpen, onClose }: BookingModalProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Defaults: tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split("T")[0];

  const [date, setDate] = useState(defaultDate);
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("14:00");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Compute hours and price
  const calculateHours = () => {
    if (!startTime || !endTime) return 1;
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    const diffInMinutes = endH * 60 + endM - (startH * 60 + startM);
    return Math.max(1, Math.round(diffInMinutes / 60));
  };

  const totalHours = calculateHours();
  const subtotal = totalHours * studio.hourlyRate;
  const securityDeposit = studio.securityDeposit || 0;
  const totalPrice = subtotal + securityDeposit;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!user) {
      toast.error("Please sign in first to reserve this creative space.");
      router.push("/login");
      return;
    }

    if (!date) {
      toast.error("Please choose a shoot date.");
      return;
    }

    if (startTime >= endTime) {
      toast.error("Shoot end time must be later than start time.");
      return;
    }

    setIsSubmitting(true);
    try {
      const serverUrl = (process.env.NEXT_PUBLIC_SERVER_API || "http://localhost:8000").replace(/\/+$/, "");

      const bookingPayload = {
        studioId: studio._id,
        studioTitle: studio.title,
        studioImage: studio.imageUrl,
        studioLocation: studio.location,
        category: studio.category,
        hourlyRate: studio.hourlyRate,
        securityDeposit: studio.securityDeposit,
        userEmail: user.email,
        userName: user.name,
        date,
        startTime,
        endTime,
        totalHours,
        totalPrice,
        notes,
      };

      const res = await fetch(`${serverUrl}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(bookingPayload),
      });

      const data = await res.json();

      if (res.status === 409) {
        // Challenge 2: Double-Booking Collision Prevention detected
        setErrorMessage(data.message || "This slot is already booked. Please choose a different time or date.");
        toast.error("Booking Conflict Detected", {
          description: data.message,
        });
        return;
      }

      if (res.status === 401) {
        toast.error("Authentication required. Please log in again.");
        router.push("/login");
        return;
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to process booking reservation.");
      }

      toast.success("Reservation Submitted Successfully!", {
        description: `Your booking for ${studio.title} is now Pending confirmation.`,
      });

      onClose();
      router.push("/my-bookings");
    } catch (err: any) {
      console.error("Booking error:", err);
      setErrorMessage(err.message || "An unexpected error occurred while booking.");
      toast.error(err.message || "Failed to book studio.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg rounded-2xl bg-card border-border p-6 shadow-2xl">
        <DialogHeader className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-orange-500">
            <span className="size-2 rounded-full bg-orange-500" />
            Instant Studio Reservation
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
            Reserve Workspace
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
            {studio.title} — ${studio.hourlyRate}/hr
          </DialogDescription>
        </DialogHeader>

        {errorMessage && (
          <div className="p-3.5 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-xs flex items-start gap-2">
            <AlertCircle className="size-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Date Picker */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Calendar className="size-3.5 text-orange-500" />
              Shoot Date
            </label>
            <Input
              type="date"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
              className="bg-background rounded-xl border-border text-sm h-10"
              required
            />
          </div>

          {/* Time Range */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Clock className="size-3.5 text-orange-500" />
                Start Time
              </label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="bg-background rounded-xl border-border text-sm h-10"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Clock className="size-3.5 text-orange-500" />
                End Time
              </label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="bg-background rounded-xl border-border text-sm h-10"
                required
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Production Details & Gear Requests (Optional)
            </label>
            <Textarea
              placeholder="e.g. Commercial video shoot, 4 actors, requires extra C-stands and lighting grid tie-in."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-background rounded-xl border-border text-xs min-h-[70px] resize-none"
            />
          </div>

          {/* Price Breakdown Calculation */}
          <div className="p-4 rounded-xl bg-muted/50 border border-border/80 space-y-2 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>Hourly Rate ({totalHours} hr{totalHours > 1 ? "s" : ""} × ${studio.hourlyRate})</span>
              <span className="font-medium text-foreground">${subtotal}</span>
            </div>
            {securityDeposit > 0 && (
              <div className="flex justify-between text-muted-foreground">
                <span>Refundable Security Deposit</span>
                <span className="font-medium text-foreground">${securityDeposit}</span>
              </div>
            )}
            <div className="pt-2 border-t border-border flex justify-between items-center text-sm font-bold text-foreground">
              <span>Total Estimated</span>
              <span className="text-lg text-orange-500">${totalPrice}</span>
            </div>
            <p className="text-[11px] text-muted-foreground/80 pt-1">
              Reservation is saved with <span className="font-semibold text-foreground">Pending</span> status for host approval.
            </p>
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border-border cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold cursor-pointer shadow-md shadow-orange-500/20"
            >
              {isSubmitting ? "Processing..." : "Confirm & Book Space"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

