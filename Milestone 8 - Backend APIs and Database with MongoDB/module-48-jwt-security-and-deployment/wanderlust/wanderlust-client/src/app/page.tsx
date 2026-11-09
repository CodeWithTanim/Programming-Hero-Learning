import Banner from "@/components/Banner";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import { Destination } from "@/components/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  let destinations: Destination[] = [];
  const serverUrl =
    process.env.SERVER_URL ||
    process.env.NEXT_PUBLIC_SERVER_URL ||
    "http://localhost:8000";

  try {
    const res = await fetch(`${serverUrl}/featured-destinations`, {
      cache: "no-store",
    });
    if (res.ok) {
      destinations = await res.json();
    }
  } catch (err) {
    console.error("Error fetching featured destinations:", err);
  }

  return (
    <main className="flex-1">
      <Banner />
      <FeaturedDestinations initialDestinations={destinations} />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
    </main>
  );
}

