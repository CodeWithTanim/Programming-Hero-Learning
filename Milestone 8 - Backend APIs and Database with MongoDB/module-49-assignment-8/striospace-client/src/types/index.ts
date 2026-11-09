export interface StudioReview {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Studio {
  _id: string;
  title: string;
  category: "Photo Studio" | "Film Stage" | "Podcast Lounge" | "Music Suite" | "Art Workshop" | string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  imageUrl: string;
  gallery: string[];
  amenities: string[];
  overview: string;
  ownerName: string;
  ownerEmail: string;
  ownerAvatar?: string;
  rating: number;
  reviewsCount: number;
  reviews?: StudioReview[];
  createdAt: string;
  updatedAt?: string;
}

export interface Booking {
  _id: string;
  studioId: string;
  studioTitle: string;
  studioImage: string;
  studioLocation: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  userEmail: string;
  userName: string;
  date: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  totalPrice: number;
  notes?: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
}

export interface NavLink {
  name: string;
  href: string;
}

