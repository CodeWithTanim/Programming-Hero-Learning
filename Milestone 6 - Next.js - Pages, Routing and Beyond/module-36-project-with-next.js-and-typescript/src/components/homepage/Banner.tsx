import React from "react";
import bannerImg from "@/assets/hero_img.jpg";
import Image from "next/image";

const Banner = () => {
  return (
    <section className="py-10 sm:py-14 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center overflow-hidden rounded-3xl bg-[#F5F5F5] md:grid-cols-2">
          
          {/* Content */}
          <div className="px-6 py-10 sm:px-1 0 lg:px-14 lg:py-16">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
              Discover your next read
            </p>

            <h2 className="max-w-xl text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Books to freshen up your bookshelf
            </h2>

            <p className="mt-5 max-w-md text-base leading-7 text-gray-600">
              Explore books worth adding to your collection and find your next
              favorite read.
            </p>

            <button className="mt-8 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700">
              View the List
            </button>
          </div>

          {/* Image */}
          <div className="relative h-[280px] md:h-full md:min-h-[420px]">
            <Image
              src={bannerImg}
              alt="Books on a bookshelf"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;