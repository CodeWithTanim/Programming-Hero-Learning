import HeroSlider from "@/components/HeroSlider";
import CategoryBrowse from "@/components/CategoryBrowse";
import FeaturedStudios from "@/components/FeaturedStudios";
import HowBookingWorks from "@/components/HowBookingWorks";
import HostGuarantee from "@/components/HostGuarantee";
import AboutUs from "@/components/AboutUs";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Banner / Hero Slider */}
      <HeroSlider />

      {/* Stats Quick Bar */}
      <section className="border-b border-border bg-card/50 py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-foreground">150+</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Creative Studios</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-orange-500">12,400+</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Shoot Hours Booked</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-foreground">4.96 ★</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Average Creator Rating</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-500">$1.8M+</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Earned by Space Hosts</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Browse by Studio Categories (PDF Page 3) */}
      <CategoryBrowse />

      {/* 3. Featured Studios Section (Dynamic from MongoDB .limit(6)) */}
      <FeaturedStudios />

      {/* 4. Extra Section 1: How Booking Works (4-step workflow) */}
      <HowBookingWorks />

      {/* 5. Extra Section 2: Host Guarantee & Creator Support (PDF Page 3) */}
      <HostGuarantee />

      {/* 6. About Us Section (Anchor for Navbar #about-us) */}
      <AboutUs />
    </div>
  );
}
