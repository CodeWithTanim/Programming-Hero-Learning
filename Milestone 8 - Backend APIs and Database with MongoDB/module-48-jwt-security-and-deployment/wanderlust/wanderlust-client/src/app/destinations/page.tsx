import React from "react";
import DestinationsView from "@/components/DestinationsView";
import { Destination } from "@/components/types";

const defaultDestinations: Destination[] = [
  {
    _id: "demo-1",
    destinationName: "Bali Paradise",
    country: "Nepal",
    category: "Beach",
    price: "2700",
    duration: "7 Days/6 Nights",
    imageUrl: "/assets/destinations/image1.png",
    rating: 4.5,
  },
  {
    _id: "demo-2",
    destinationName: "Bali Paradise",
    country: "Nepal",
    category: "Beach",
    price: "2700",
    duration: "7 Days/6 Nights",
    imageUrl: "/assets/destinations/image2.png",
    rating: 4.5,
  },
  {
    _id: "demo-3",
    destinationName: "Bali Paradise",
    country: "Nepal",
    category: "Nature",
    price: "2700",
    duration: "7 Days/6 Nights",
    imageUrl: "/assets/destinations/image3.png",
    rating: 4.5,
  },
  {
    _id: "demo-4",
    destinationName: "Bali Paradise",
    country: "Nepal",
    category: "Adventure",
    price: "2700",
    duration: "7 Days/6 Nights",
    imageUrl: "/assets/destinations/image4.png",
    rating: 4.5,
  },
  {
    _id: "demo-5",
    destinationName: "Bali Paradise",
    country: "Nepal",
    category: "Beach",
    price: "2700",
    duration: "7 Days/6 Nights",
    imageUrl: "/assets/destinations/image5.png",
    rating: 4.5,
  },
  {
    _id: "demo-6",
    destinationName: "Bali Paradise",
    country: "Nepal",
    category: "Adventure",
    price: "2700",
    duration: "7 Days/6 Nights",
    imageUrl: "/assets/destinations/image6.png",
    rating: 4.5,
  },
];

export const dynamic = "force-dynamic";

export default async function AllDestinationPage() {
  const serverUrl =
    process.env.SERVER_URL ||
    process.env.NEXT_PUBLIC_SERVER_URL ||
    "http://localhost:8000";
  const url = process.env.ALL_DESTINATIONS || `${serverUrl}/destinations`;
  let destinations: Destination[] = [];

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (res.ok) {
      destinations = await res.json();
    }
  } catch (error) {
    console.error("Could not fetch destinations from server, using fallback:", error);
  }

  const initialData = destinations && destinations.length > 0 ? destinations : defaultDestinations;

  return <DestinationsView initialDestinations={initialData} />;
}
