"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Testimonial } from "@/components/types";

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    author: "— Michael Chen",
    location: "Singapore",
    image: "/assets/person2.png",
  },
  {
    id: "2",
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    author: "— Sarah Johnson",
    location: "New York, USA",
    image: "/assets/person1.png",
  },
  {
    id: "3",
    quote:
      '"Absolutely incredible experience! The itinerary was perfect and our guide was amazing. Wanderlust made our dream vacation completely stress-free."',
    author: "— David Chen",
    location: "Sydney, Australia",
    image: "/assets/person2.png",
  },
  {
    id: "4",
    quote:
      '"Unbelievable service from start to finish. The personalized touch and attention to detail made all the difference on our family journey to Kyoto."',
    author: "— Emma Watson",
    location: "London, UK",
    image: "/assets/person1.png",
  },
];

export default function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    if (!api) return;

    const updateScrollState = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    updateScrollState();
    api.on("select", updateScrollState);
    api.on("reInit", updateScrollState);

    return () => {
      api.off("select", updateScrollState);
      api.off("reInit", updateScrollState);
    };
  }, [api]);

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-normal text-[#0c0b0b] leading-tight tracking-tight">
              What Travelers Say
            </h2>
            <p className="text-[#6c696d] text-base sm:text-lg mt-2 font-normal">
              Real experiences from our happy travelers
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => api?.scrollPrev()}
              disabled={!canScrollPrev}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full border border-neutral-300 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 hover:border-neutral-400 disabled:opacity-30 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 stroke-[1.75]" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => api?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full border border-neutral-300 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 hover:border-neutral-400 disabled:opacity-30 transition-colors"
            >
              <ArrowRight className="w-4 h-4 stroke-[1.75]" />
            </Button>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="mt-8 sm:mt-12">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-6">
              {testimonials.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-6 basis-full lg:basis-1/2"
                >
                  <Card className="border border-[#eeeeee] bg-white rounded-none p-6 sm:p-7 h-full shadow-none hover:shadow-xs transition-shadow ring-0">
                    <div className="flex flex-col-reverse sm:flex-row items-stretch justify-between gap-6 h-full">
                      {/* Left: Quote & Author */}
                      <div className="flex flex-col justify-between flex-1 py-1">
                        <p className="text-base sm:text-lg lg:text-[19px] font-normal text-[#0c0b0b] leading-snug tracking-tight">
                          {item.quote}
                        </p>

                        <div className="mt-8 pt-2">
                          <span className="text-[#15a1bf] font-medium text-sm sm:text-base block">
                            {item.author}
                          </span>
                          <span className="text-[#6c696d] text-xs sm:text-sm block mt-0.5">
                            {item.location}
                          </span>
                        </div>
                      </div>

                      {/* Right: Picture */}
                      <div className="relative w-full sm:w-[180px] lg:w-[218px] h-[220px] sm:h-[264px] shrink-0 overflow-hidden bg-neutral-100">
                        <Image
                          src={item.image}
                          alt={item.author.replace(/^—\s*/, "")}
                          fill
                          sizes="(max-width: 640px) 100vw, 218px"
                          className="object-cover object-center"
                        />
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}

