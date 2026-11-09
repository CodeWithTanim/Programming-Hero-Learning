import React from "react";

// ==========================================
// Destination Types
// ==========================================

export interface Destination {
  _id?: string;
  destinationName: string;
  country: string;
  category: string;
  price: string | number;
  duration: string | number;
  departureDate?: string;
  imageUrl?: string;
  description?: string;
  rating?: number;
}

export interface DestinationFormData {
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
}

// ==========================================
// Component Props Types
// ==========================================

export interface DestinationsViewProps {
  initialDestinations: Destination[];
}

export interface EditDestinationDialogueProps {
  destination?: Destination | null;
}

export interface DeleteDestinationDialogProps {
  id: string;
  destinationName?: string;
}

export interface BookingCardProps {
  price?: string | number;
  departureDate?: string;
  destinationId?: string;
  destination?: Destination | null;
}

export interface Booking {
  _id?: string;
  destinationId?: string;
  destinationName?: string;
  price?: string | number;
  departureDate?: string;
  userEmail?: string;
  email?: string;
  userName?: string;
  userId?: string;
  status?: "Confirmed" | "Pending" | "Cancelled" | string;
  imageUrl?: string;
  createdAt?: string;
}

export interface MyBookingCardProps {
  booking: Booking;
}

export interface Testimonial {
  id: number | string;
  quote: string;
  author: string;
  location: string;
  image: string;
}

export interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export interface NavLink {
  name: string;
  href: string;
}

export interface AuthLink {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

