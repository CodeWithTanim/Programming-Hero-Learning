"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutUs() {
  return (
    <section id="about-us" className="py-20 sm:py-28 bg-card/60 border-t border-border/60 transition-colors scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-orange-500">
            <span className="size-2 rounded-full bg-orange-500" />
            Our Mission & Story
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            About Studio<span className="text-orange-500">Space</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            StudioSpace is the premier peer-to-peer production studio sharing platform. We bridge the gap between world-class creative facilities and the visionaries who bring stories, music, and imagery to life.
          </p>
        </div>

        {/* Narrative & Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Narrative Box */}
          <div className="space-y-6 text-muted-foreground text-sm sm:text-base leading-relaxed">
            <p>
              Finding production space has historically been one of the biggest hurdles in creative production. Filmmakers and photographers often struggle with opaque pricing, complex insurance demands, and underutilized professional soundstages sitting dark during weekdays.
            </p>
            <p>
              We built StudioSpace to solve this. Whether you need a 3-wall seamless cyclorama for a fashion lookbook, an acoustically tuned mastering suite with vintage analog compressors, or a 4K multi-cam video podcast lounge, StudioSpace puts certified production environments at your fingertips.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <Button
                asChild
                className="rounded-xl px-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-md shadow-orange-500/20 cursor-pointer"
              >
                <Link href="/studios">
                  <span>Explore All Studios</span>
                  <ArrowRight className="size-4 ml-1.5" />
                </Link>
              </Button>

              <Button
                variant="outline"
                asChild
                className="rounded-xl border-border hover:bg-muted font-medium cursor-pointer"
              >
                <Link href="/add-studio">Host Your Space</Link>
              </Button>
            </div>
          </div>

          {/* Right Metrics / Image Card */}
          <div className="relative rounded-3xl overflow-hidden border border-border bg-card shadow-2xl p-8 sm:p-10 space-y-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">
                Empowering Production Nationwide
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Trusted by independent filmmakers, commercial agencies, Grammy-nominated audio engineers, and top podcasters.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border/60">
              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-black text-foreground">150+</span>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Verified Studios
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-black text-orange-500">12,000+</span>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Hours Produced
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-black text-foreground">4.96 ★</span>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Creator Rating
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-black text-emerald-500">$1.8M+</span>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Paid to Hosts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
