import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Banner() {
  return (
    <section className="relative min-h-[560px] sm:min-h-[640px] lg:min-h-[740px] flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/Banner.png"
        alt="Lush green coastal bay adventure destination"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-center -z-20"
      />

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/35 -z-10" />

      {/* Hero Content */}
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-normal leading-[1.06] tracking-tight drop-shadow-sm">
          Discover Your <br /> Next Adventure
        </h1>

        <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-white/95 max-w-2xl font-light tracking-wide leading-relaxed drop-shadow-sm">
          Explore breathtaking destinations and create unforgettable memories with
          our curated travel experiences.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 bg-[#15a1bf] hover:bg-[#128ca6] text-white text-xs sm:text-sm font-semibold tracking-wider px-7 py-3.5 transition-all duration-200 uppercase shadow-sm"
          >
            <span>EXPLORE NOW</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/destinations"
            className="inline-flex items-center justify-center bg-white/40 hover:bg-white/50 backdrop-blur-xs text-white text-xs sm:text-sm font-semibold tracking-wider px-7 py-3.5 transition-all duration-200 border border-white/20 uppercase shadow-sm"
          >
            <span>VIEW DESTINATION</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

