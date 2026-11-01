import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative w-full min-h-[440px] flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-[120px] overflow-hidden">
      {/* Background Aerial Island & Airplane Image */}
      <Image
        src="/assets/CTA.png"
        alt="Ready To Start Your Journey"
        fill
        sizes="100vw"
        className="object-cover object-center -z-20"
      />

      {/* Top & Bottom Vignette / Dark Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/25 to-black/80 -z-10" />

      {/* Content */}
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-white relative z-10">
        <h2 className="text-3xl sm:text-5xl lg:text-[60px] font-normal leading-tight tracking-tight drop-shadow-md">
          Ready To Start Your Journey?
        </h2>

        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/90 font-light tracking-wide max-w-2xl mx-auto drop-shadow-sm">
          Join thousands of travelers who have discovered the world with us
        </p>

        {/* Action Button */}
        <div className="mt-8 sm:mt-10">
          <Link
            href="/destinations"
            className="inline-flex items-center justify-center gap-3 bg-white hover:bg-neutral-100 text-[#0c0b0b] text-xs sm:text-sm font-semibold tracking-wider px-8 py-4 transition-all duration-200 uppercase shadow-md group"
          >
            <span>BOOK YOUR TRIP TODAY</span>
            <ArrowRight className="w-4 h-4 stroke-[2] transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

