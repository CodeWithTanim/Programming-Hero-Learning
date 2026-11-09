"use client";

import React from "react";
import Link from "next/link";
import { Search, Calendar, Zap, Film, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    step: "01",
    title: "Discover Spaces",
    description: "Browse high-fidelity creative spaces with real-time specs, gear inventory, 360 photos, and verified reviews.",
    icon: Search,
    color: "from-sky-500 to-blue-600",
  },
  {
    step: "02",
    title: "Select Shoot Hours",
    description: "Pick your exact production date, start time, and shoot duration with zero hidden booking fees and dynamic hourly rates.",
    icon: Calendar,
    color: "from-amber-500 to-orange-600",
  },
  {
    step: "03",
    title: "Book Instantly",
    description: "Reserve your production slot in seconds with automated collision prevention, clear cancellation policies, and invoice receipts.",
    icon: Zap,
    color: "from-purple-500 to-indigo-600",
  },
  {
    step: "04",
    title: "Create & Produce",
    description: "Walk into a pre-configured studio ready for action. Connect with your host, record pristine content, and wrap up with ease.",
    icon: Film,
    color: "from-emerald-500 to-teal-600",
  },
];

export default function HowBookingWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-muted/30 border-y border-border/60 transition-colors scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-semibold uppercase tracking-wider">
            Streamlined Creative Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            How Booking Works
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Eliminate endless back-and-forth emails and sketchy contracts. Rent certified creative studios in four straightforward steps.
          </p>
        </div>

        {/* 4-Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-card rounded-2xl p-6 border border-border/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black text-muted-foreground/30 font-mono group-hover:text-orange-500/50 transition-colors">
                      {item.step}
                    </span>
                    <div className={`size-11 rounded-xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-md shadow-orange-500/10`}>
                      <Icon className="size-5 stroke-[2]" />
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-border/40 flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-3.5" />
                  <span>Guaranteed Availability</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="rounded-xl px-8 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-md shadow-orange-500/20 cursor-pointer"
            asChild
          >
            <Link href="/studios">
              <span>Start Exploring Available Studios</span>
              <ArrowRight className="size-4 ml-1.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

