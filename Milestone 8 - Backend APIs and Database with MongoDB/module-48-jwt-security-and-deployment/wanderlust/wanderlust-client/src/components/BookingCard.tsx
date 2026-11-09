"use client";

import React, { useState } from "react";
import { ArrowRight, Check, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { BookingCardProps } from "@/components/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { authClient } from "@/lib/auth-client";
import { methods } from "better-auth/react";

const BookingCard = ({
    price = "1299",
    departureDate = "05/15/2026",
    destinationId,
    destination,
}: BookingCardProps) => {
    const effectivePrice = destination?.price ?? price;
    const effectiveDepartureDate = destination?.departureDate ?? departureDate;

    const parseInitialDate = (dateStr?: string) => {
        if (!dateStr) return new Date();
        try {
            const parsed = new Date(dateStr);
            if (!isNaN(parsed.getTime())) return parsed;
        } catch (_) { }
        return new Date();
    };

    const [date, setDate] = useState<Date | undefined>(() =>
        parseInitialDate(effectiveDepartureDate)
    );
    const [open, setOpen] = useState(false);

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const departureDateValue =
            (form.elements.namedItem("departureDate") as HTMLInputElement)?.value ||
            (date ? format(date, "MM/dd/yyyy") : "");

        const bookingData = {
            destinationId: destinationId || destination?._id,
            destinationName: destination?.destinationName,
            imageUrl: destination?.imageUrl,
            price: effectivePrice,
            departureDate: departureDateValue,
            email: user?.email,
            userEmail: user?.email,
            userName: user?.name,
            userId: user?.id,
            createdAt: new Date().toISOString(),
        };

        console.log("Booking submitted:", bookingData);
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";
        const res = await fetch(`${serverUrl}/booking`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData)
        })
        const bookingRes = await res.json()
        console.log(bookingRes)

    };

    return (
        <aside className="lg:col-span-4">
            <form
                onSubmit={handleBooking}
                className="bg-white border border-[#eeeeee] shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-8 space-y-6 lg:sticky lg:top-24"
            >
                {/* Hidden Fields for Form Submission */}
                <input
                    type="hidden"
                    name="departureDate"
                    value={date ? format(date, "MM/dd/yyyy") : ""}
                />
                <input
                    type="hidden"
                    name="destinationId"
                    value={destinationId || destination?._id || ""}
                />
                <input
                    type="hidden"
                    name="price"
                    value={String(effectivePrice)}
                />

                {/* Price Header */}
                <div className="space-y-1">
                    <p className="text-sm text-[#6c696d]">Starting from</p>
                    <p className="text-3xl sm:text-4xl font-serif font-bold text-[#15a1bf]">
                        ${effectivePrice}
                    </p>
                    <p className="text-xs sm:text-sm text-[#6c696d]">per person</p>
                </div>

                {/* Departure Date Display Box / Selectable Date Picker */}
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#6c696d]">
                        Departure Date
                    </label>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger
                            type="button"
                            className="w-full bg-[#f8f9fa] border border-[#e5e7eb] px-4 py-3 text-sm text-[#0c0b0b] font-medium flex items-center justify-between cursor-pointer hover:border-[#15a1bf] focus:border-[#15a1bf] focus:outline-none transition-colors text-left"
                        >
                            <span>{date ? format(date, "MM/dd/yyyy") : "Select departure date"}</span>
                            <CalendarIcon className="w-4 h-4 text-[#6c696d]" />
                        </PopoverTrigger>
                        <PopoverContent
                            align="start"
                            sideOffset={4}
                            className="w-auto p-2 bg-white border border-[#eeeeee] shadow-[0_4px_24px_rgba(0,0,0,0.08)] rounded-none z-50"
                        >
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(newDate) => {
                                    if (newDate) {
                                        setDate(newDate);
                                        setOpen(false);
                                    }
                                }}
                                disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Book Now Action Button */}
                <button
                    type="submit"
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
            </form>
        </aside>
    );
};

export default BookingCard;
