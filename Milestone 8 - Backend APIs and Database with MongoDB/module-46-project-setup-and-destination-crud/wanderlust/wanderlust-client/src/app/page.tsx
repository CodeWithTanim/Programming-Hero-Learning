import Banner from "@/components/Banner";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main className="flex-1">
      <Banner />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
    </main>
  );
}
