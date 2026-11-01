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

