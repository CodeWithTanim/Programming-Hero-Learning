import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";
import Link from "next/link";
import MyBookingCard from "@/components/MyBookingCard";
import { Booking } from "@/components/types";

export const dynamic = "force-dynamic";

const MyBookingPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;
    // console.log(user)

    let bookings: Booking[] = [];
    try {
        if (user?.email) {
            const res = await fetch(`http://localhost:8000/my-bookings/${user?.email}`, {
                cache: "no-store",
            });
            if (res.ok) {
                bookings = await res.json();
            }
        }
    } catch (err) {
        console.error("Error fetching bookings:", err);
    }
    // console.log(bookings)

    return (
        <div className="w-full bg-[#fafafa] min-h-[calc(100vh-56px)] py-10 sm:py-14">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="mb-8 sm:mb-10">
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#0c0b0b] font-normal tracking-tight">
                        My Bookings
                    </h1>
                    <p className="text-sm sm:text-base text-[#6c696d] mt-2 font-normal">
                        Manage and view your upcoming travel plans
                    </p>
                </div>

                {/* Bookings List */}
                {Array.isArray(bookings) && bookings.length > 0 ? (
                    <div className="space-y-6">
                        {bookings.map((booking, index) => (
                            <MyBookingCard key={booking._id || index} booking={booking} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white border border-[#eeeeee] p-12 text-center shadow-sm">
                        <p className="font-serif text-xl text-[#0c0b0b] mb-2">No bookings found</p>
                        <p className="text-sm text-[#6c696d] mb-6">
                            You haven&apos;t booked any travel packages yet.
                        </p>
                        <Link
                            href="/destinations"
                            className="inline-flex items-center justify-center px-6 h-11 bg-[#15a1bf] hover:bg-[#128ca6] text-white text-sm font-semibold transition-colors rounded-none"
                        >
                            Explore Destinations
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookingPage;
