
export type UserRole = 'client' | 'pro' | 'affiliate';

export type AppointmentStatus = 'confirmed' | 'completed' | 'cancelled' | 'blocked';
export type PaymentStatus = 'unpaid' | 'deposit_paid' | 'paid';

export interface Service {
  id: string;
  name: string;
  duration: number; // minutes
  price: number;
  description: string;
  category?: string;
  imageUrl?: string;
  isActive?: boolean;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface WorkingDay {
  day: string;
  isOpen: boolean;
  start: string;
  end: string;
  breakStart?: string;
  breakEnd?: string;
}

export interface BlockedTime {
  id: string;
  date: string; // ISO string YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  reason: string;
  isRecurring: boolean;
}

export interface Stylist {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  rating: number;
  reviewCount: number;
  distance: string;
  imageUrl: string;
  gallery: string[];
  services: Service[];
  reviews: Review[];
  availability: string[]; // e.g. ["9:00 AM", "10:30 AM", ...]
  address?: string;
  claimed?: boolean;
  bookedCount?: string;
  tags?: string[];
  hours?: { day: string; hours: string }[];
  workingDays?: WorkingDay[];
  bufferTime?: number; // minutes
  policies?: { title: string; content: string }[];
  socials?: { platform: string; url: string }[];
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  comments: number;
  excerpt: string;
  imageUrl: string;
}

export interface Appointment {
  id: string;
  stylistId: string;
  stylistName: string;
  service: Service;
  date: string; // ISO string YYYY-MM-DD
  time: string; // HH:mm
  endTime?: string; // HH:mm
  status: AppointmentStatus;
  paymentStatus?: PaymentStatus;
  clientName: string;
  clientPhone?: string;
  clientEmail?: string;
  notes?: string;
}

export type AppView = 
  | 'home' 
  | 'search' 
  | 'profile' 
  | 'dashboard' 
  | 'pro-dashboard'
  | 'booking-success'
  | 'same-day'
  | 'blog'
  | 'list-business'
  | 'get-app'
  | 'income-calculator'
  | 'register'
  | 'login'
  | 'subscription'
  | 'affiliate-become'
  | 'affiliate-reg'
  | 'affiliate-login'
  | 'affiliate-area'
  | 'affiliate-terms'
  | 'pricing'
  | 'style-preview';
