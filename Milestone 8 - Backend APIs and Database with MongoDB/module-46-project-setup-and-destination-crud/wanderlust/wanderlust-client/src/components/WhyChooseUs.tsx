import React from "react";
import Image from "next/image";
import { FeatureCardProps } from "@/components/types";

const features: FeatureCardProps[] = [
  {
    icon: "/assets/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/assets/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/assets/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-[#edfcff] py-16 sm:py-20 lg:py-[120px] px-4 sm:px-8 lg:px-[80px]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-normal text-[#0c0b0b] leading-tight tracking-tight">
            Why Choose Wanderlust
          </h2>
          <p className="text-[#6c696d] text-base sm:text-lg font-normal leading-relaxed">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="w-full mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-8 sm:p-10 flex flex-col items-start gap-6 shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-all duration-200 hover:shadow-md"
            >
              {/* Icon */}
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                />
              </div>

              {/* Text Block */}
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-normal text-[#0c0b0b] leading-tight">
                  {feature.title}
                </h3>
                <p className="text-[#6c696d] text-sm sm:text-base font-normal leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

