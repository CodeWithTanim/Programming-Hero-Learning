"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious, 
  type CarouselApi 
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight, Video, Mic, Camera } from "lucide-react";

interface SlideData {
  id: number;
  badge: string;
  badgeIcon: React.ElementType;
  headline: string;
  highlightText: string;
  subtext: string;
  image: string;
  accent: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    badge: "Film Stages & Virtual Sets",
    badgeIcon: Video,
    headline: "Unleash Your Cinematic Vision in",
    highlightText: "World-Class Soundstages",
    subtext: "Book state-of-the-art cyclorama walls, LED volume virtual production stages, and film studios with pre-rigged lighting and sound isolation.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1800&q=85",
    accent: "from-amber-500 to-orange-600",
  },
  {
    id: 2,
    badge: "Daylight & Editorial Photo Studios",
    badgeIcon: Camera,
    headline: "Capture Perfection in Natural",
    highlightText: "Daylight Lofts & Ateliers",
    subtext: "Explore curated spaces featuring 14-foot windows, Profoto strobe packages, motorized backdrops, and dedicated hair & makeup styling lounges.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=85",
    accent: "from-sky-500 to-indigo-600",
  },
  {
    id: 3,
    badge: "Broadcast Audio & Podcast Lounges",
    badgeIcon: Mic,
    headline: "Broadcast Crisp Audio with",
    highlightText: "Turnkey Multi-Cam Suites",
    subtext: "Elevate your voice with Shure SM7B mics, Rodecaster Pro mixing, 4K ISO video capture, and acoustically tuned live recording suites.",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1800&q=85",
    accent: "from-purple-500 to-pink-600",
  },
];

export default function HeroSlider() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Autoplay interval
  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 6500);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="relative w-full overflow-hidden bg-black text-white">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {slides.map((slide, index) => {
            const Icon = slide.badgeIcon;
            return (
              <CarouselItem key={slide.id} className="pl-0 relative min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center">
                {/* Background Image with Gradient Overlay */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={slide.image}
                    alt={slide.headline}
                    className="w-full h-full object-cover object-center brightness-60 scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/35" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                  <div className="max-w-2xl lg:max-w-3xl space-y-6">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-medium tracking-wide text-white shadow-lg">
                      <Icon className="size-4 text-orange-400" />
                      <span>{slide.badge}</span>
                      <span className="size-1.5 rounded-full bg-orange-400 ml-1" />
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] sm:leading-[1.15]">
                      {slide.headline}{" "}
                      <span className={`bg-gradient-to-r ${slide.accent} bg-clip-text text-transparent`}>
                        {slide.highlightText}
                      </span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-base sm:text-lg lg:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl">
                      {slide.subtext}
                    </p>

                    {/* Primary CTA Buttons */}
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <Button
                        size="lg"
                        className="h-12 px-6 sm:px-8 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg shadow-orange-500/25 cursor-pointer transition-all hover:scale-[1.02]"
                        asChild
                      >
                        <Link href="/studios">
                          <span>Explore Studios</span>
                          <ArrowRight className="size-4 ml-1.5" />
                        </Link>
                      </Button>

                      <Button
                        size="lg"
                        variant="outline"
                        className="h-12 px-6 sm:px-8 rounded-xl border-white/20 bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-md cursor-pointer transition-all hover:scale-[1.02]"
                        asChild
                      >
                        <Link href="/add-studio">
                          <span>Host Your Space</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Carousel Navigation Arrows */}
        <div className="hidden sm:block">
          <CarouselPrevious className="left-4 sm:left-8 bg-black/40 hover:bg-black/70 text-white border-white/20 backdrop-blur-md size-11" />
          <CarouselNext className="right-4 sm:right-8 bg-black/40 hover:bg-black/70 text-white border-white/20 backdrop-blur-md size-11" />
        </div>

        {/* Slide Indicators / Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => api?.scrollTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === idx ? "w-8 bg-orange-500" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}

