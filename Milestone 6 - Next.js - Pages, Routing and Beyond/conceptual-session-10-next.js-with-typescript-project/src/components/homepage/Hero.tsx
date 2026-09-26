import Image from "next/image";
import Link from "next/link";

import heroImage from "@/assets/hero.png";

const Hero = () => {
    return (
        <section className="bg-[#f8f8f8]">
            <div className="max-w-300 mx-auto px-4 pt-16 text-center">
                {/* Heading */}
                <h1 className="text-[52px] md:text-[58px] leading-[1.1] font-bold text-[#19324a]">
                    We Build
                    <br />
                    <span className="text-[#8b4de8]">Productive</span> Apps
                </h1>

                {/* Description */}
                <p className="mt-5 text-[16px] leading-6 text-[#65788c]">
                    At HERO.IO , we craft innovative apps designed to make everyday life
                    simpler, smarter, and more exciting.
                    <br />
                    Our goal is to turn your ideas into digital experiences that truly
                    make an impact.
                </p>

                {/* Store Buttons */}
                <div className="flex justify-center items-center gap-3 mt-8">
                    <Link
                        href="https://play.google.com/"
                        target="_blank"
                        className="flex items-center gap-3 border border-gray-300 rounded px-5 py-2.5 bg-white hover:bg-gray-50 transition"
                    >
                        <span className="text-[22px]">▶</span>
                        <span className="text-[16px] font-semibold text-[#19324a]">
                            Google Play
                        </span>
                    </Link>

                    <Link
                        href="https://www.apple.com/app-store/"
                        target="_blank"
                        className="flex items-center gap-3 border border-gray-300 rounded px-5 py-2.5 bg-white hover:bg-gray-50 transition"
                    >
                        <span className="text-[22px]">●</span>
                        <span className="text-[16px] font-semibold text-[#19324a]">
                            App Store
                        </span>
                    </Link>
                </div>

                {/* Hero Image */}
                <div className="flex justify-center mt-7">
                    <Image
                        src={heroImage}
                        alt="HERO.IO App"
                        priority
                        className="w-150 max-w-full h-auto object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;