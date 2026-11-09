import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-background flex flex-col items-center justify-center px-4 py-12 text-center transition-colors relative overflow-hidden">
      {/* Ambient background studio glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-lg w-full flex flex-col items-center">
        {/* 404 Illustration with Kawaii Cone */}
        <div className="relative flex items-center justify-center select-none mb-6 sm:mb-8">
          {/* Left "4" */}
          <span 
            className="text-8xl sm:text-9xl md:text-[11rem] font-black tracking-tighter text-foreground leading-none drop-shadow-xl select-none transition-colors"
            style={{
              WebkitTextStroke: "3px var(--foreground)",
              paintOrder: "stroke fill",
            }}
          >
            4
          </span>

          {/* Center Kawaii Traffic Cone */}
          <div className="relative mx-1 sm:mx-3 flex flex-col items-center justify-end">
            {/* "OOPS!" Speech Bubble */}
            <div className="absolute -top-4 sm:-top-6 -right-6 sm:-right-8 z-20 flex flex-col items-start pointer-events-none">
              <div className="bg-amber-400 text-zinc-950 font-black text-xs sm:text-sm tracking-wider px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-lg shadow-amber-400/25 border border-amber-300 animate-bounce">
                OOPS!
              </div>
              {/* Tail pointing down to the cone */}
              <svg 
                className="w-4 h-4 -mt-1 ml-3 text-amber-400" 
                viewBox="0 0 16 16" 
                fill="none"
              >
                <path 
                  d="M2 1 C 3 8, 8 13, 14 14" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                />
              </svg>
            </div>

            {/* Kawaii Traffic Cone SVG */}
            <svg
              viewBox="0 0 180 200"
              className="w-32 h-36 sm:w-44 sm:h-48 md:w-52 md:h-56 drop-shadow-2xl"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="coneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="50%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>

                <clipPath id="coneBodyClip">
                  {/* Tapered Cone Shape with rounded apex */}
                  <path d="M 81 22 C 85 14, 95 14, 99 22 L 154 168 H 26 Z" />
                </clipPath>
              </defs>

              {/* Floor Shadow Under Platform */}
              <ellipse cx="90" cy="186" rx="72" ry="8" fill="#000000" opacity="0.6" />

              {/* Base Platform */}
              <rect
                x="18"
                y="166"
                width="144"
                height="16"
                rx="7"
                fill="#18181b"
                stroke="#27272a"
                strokeWidth="2"
              />

              {/* Clipped Cone Body */}
              <g clipPath="url(#coneBodyClip)">
                {/* Orange Cone Base */}
                <rect x="0" y="0" width="180" height="200" fill="url(#coneGradient)" />

                {/* Upper White Reflective Stripe */}
                <rect x="0" y="60" width="180" height="26" fill="#ffffff" />

                {/* Lower White Reflective Stripe (kawaii face area) */}
                <rect x="0" y="110" width="180" height="40" fill="#ffffff" />

                {/* Subtle highlight sheen */}
                <path d="M 85 18 L 96 18 L 65 170 L 42 170 Z" fill="#ffffff" opacity="0.15" />
              </g>

              {/* Kawaii Face on Lower White Stripe */}
              {/* Left Eye */}
              <circle cx="76" cy="126" r="3.2" fill="#18181b" />
              <circle cx="77.2" cy="125" r="1.1" fill="#ffffff" />

              {/* Right Eye */}
              <circle cx="104" cy="126" r="3.2" fill="#18181b" />
              <circle cx="105.2" cy="125" r="1.1" fill="#ffffff" />

              {/* Cute Dot Mouth */}
              <circle cx="90" cy="130" r="1.6" fill="#18181b" />

              {/* Soft Pink Blush Cheeks */}
              <ellipse cx="68" cy="132" rx="4.2" ry="3" fill="#f472b6" opacity="0.85" />
              <ellipse cx="112" cy="132" rx="4.2" ry="3" fill="#f472b6" opacity="0.85" />
            </svg>
          </div>

          {/* Right "4" */}
          <span 
            className="text-8xl sm:text-9xl md:text-[11rem] font-black tracking-tighter text-foreground leading-none drop-shadow-xl select-none transition-colors"
            style={{
              WebkitTextStroke: "3px var(--foreground)",
              paintOrder: "stroke fill",
            }}
          >
            4
          </span>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight mb-2.5 drop-shadow-xs transition-colors">
          Page not found
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground font-medium max-w-sm sm:max-w-md mx-auto mb-8 leading-relaxed transition-colors">
          The requested URL was not found on this server
        </p>

        {/* Action Buttons matching project palette */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-xs sm:max-w-sm">
          {/* GO HOME */}
          <Button
            size="lg"
            className="w-full sm:flex-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700/80 font-bold uppercase tracking-wider text-xs py-3.5 shadow-sm cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
            asChild
          >
            <Link href="/" className="flex items-center justify-center gap-2">
              <Home className="size-4 text-zinc-300" />
              <span>Go Home</span>
            </Link>
          </Button>

          {/* EXPLORE STUDIOS */}
          <Button
            size="lg"
            className="w-full sm:flex-1 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold uppercase tracking-wider text-xs py-3.5 shadow-lg shadow-orange-500/25 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
            asChild
          >
            <Link href="/studios" className="flex items-center justify-center gap-2">
              <Compass className="size-4" />
              <span>Explore Studios</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
