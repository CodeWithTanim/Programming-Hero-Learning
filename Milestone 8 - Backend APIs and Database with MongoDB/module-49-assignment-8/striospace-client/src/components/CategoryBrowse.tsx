"use client";

import React from "react";
import Link from "next/link";
import { Camera, Video, Mic, Music, Palette, ArrowRight } from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  categoryQuery: string;
  description: string;
  icon: React.ElementType;
  count: string;
  gradient: string;
  image: string;
}

const categories: CategoryItem[] = [
  {
    id: "photo",
    name: "Photo Studios",
    categoryQuery: "Photo Studio",
    description: "Daylight lofts, cyc walls, fashion ateliers, & strobe setups",
    icon: Camera,
    count: "45+ Spaces",
    gradient: "from-sky-500/20 via-sky-500/5 to-transparent",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "film",
    name: "Sound Stages & Film",
    categoryQuery: "Film Stage",
    description: "Cinema stages, virtual LED volumes, green screens, & bay doors",
    icon: Video,
    count: "30+ Stages",
    gradient: "from-amber-500/20 via-amber-500/5 to-transparent",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "podcast",
    name: "Podcast Rooms",
    categoryQuery: "Podcast Lounge",
    description: "Multi-cam 4K streaming suites, Shure SM7B mics, & soundproofing",
    icon: Mic,
    count: "28+ Lounges",
    gradient: "from-purple-500/20 via-purple-500/5 to-transparent",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "music",
    name: "Music Suites",
    categoryQuery: "Music Suite",
    description: "Analog consoles, live drum rooms, vocal booths, & Atmos monitoring",
    icon: Music,
    count: "35+ Suites",
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "art",
    name: "Art Workshops",
    categoryQuery: "Art Workshop",
    description: "Ceramics kilns, printmaking presses, pottery wheels, & sculpture labs",
    icon: Palette,
    count: "20+ Studios",
    gradient: "from-rose-500/20 via-rose-500/5 to-transparent",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80",
  },
];

export default function CategoryBrowse() {
  return (
    <section className="py-16 sm:py-20 bg-background transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-orange-500 mb-2">
              <span className="size-2 rounded-full bg-orange-500" />
              Specialized Creative Disciplines
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
              Browse by Studio Category
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-xl">
              From daylight photography lofts to commercial soundstages and podcast broadcast suites, discover the exact space tailored for your production.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors shrink-0 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/studios?category=${encodeURIComponent(cat.categoryQuery)}`}
                className="group relative rounded-2xl border border-border/80 bg-card p-5 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Background subtle gradient and image */}
                <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className={`absolute inset-0 bg-gradient-to-b ${cat.gradient} pointer-events-none`} />

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  <div className="size-12 rounded-xl bg-background/90 border border-border flex items-center justify-center text-foreground group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 shadow-sm transition-colors duration-300">
                    <Icon className="size-6 stroke-[1.8]" />
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-foreground group-hover:text-orange-500 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 pt-4 mt-4 border-t border-border/60 flex items-center justify-between text-xs font-medium">
                  <span className="text-muted-foreground">{cat.count}</span>
                  <span className="text-orange-500 font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    Explore <ArrowRight className="size-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

