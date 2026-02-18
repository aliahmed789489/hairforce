
import { Stylist, BlogPost } from './types';

export const CATEGORIES = [
  { id: 'braids', name: 'Braids & Extensions', icon: 'fa-braid', img: 'https://images.unsplash.com/photo-1643185539104-3622eb1f0ff6?auto=format&fit=crop&q=80&w=200' },
  { id: 'styling', name: 'Haircuts & Styling', icon: 'fa-scissors', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=200' },
  { id: 'coloring', name: 'Hair Coloring', icon: 'fa-palette', img: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=200' },
  { id: 'barbering', name: 'Barbering', icon: 'fa-user-tie', img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=200' },
  { id: 'makeup', name: 'Makeup & Glam', icon: 'fa-brush', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=200' },
  { id: 'nails', name: 'Nails & Beauty', icon: 'fa-hand-sparkles', img: 'https://images.unsplash.com/photo-1604654894610-df4909957105?auto=format&fit=crop&q=80&w=200' },
  { id: 'skin', name: 'Skin & Wellness', icon: 'fa-leaf', img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=200' },
  { id: 'kids', name: 'Kids', icon: 'fa-child', img: 'https://images.unsplash.com/photo-1519340241574-2bc3993c814d?auto=format&fit=crop&q=80&w=200' }
];

export const MOCK_STYLISTS: Stylist[] = [
  {
    id: 'matia-neblett',
    name: 'Matia Neblett',
    specialty: 'Cosmetologist at Exceptional Talent Suites',
    bio: 'I have been licensed 13 years. I specialize in locs, but my main focus is all natural hair. I offers kids and men services, twist, blow-out, relaxers, wraps, roller sets, crochet, color, trim, detox, deep conditioner, partial +full weave-etc. I do not offer for Extensions. SHAMPOO IS INCLUDED IN ALL SERVICES.',
    rating: 4.8,
    reviewCount: 193,
    bookedCount: '1k+',
    distance: '23.1 mi',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800'
    ],
    address: '807 Southern Avenue Suite 1, Oxon Hill, MD 20745',
    claimed: true,
    tags: ['Top Pro', 'Licensed', '1k+ booked'],
    hours: [
      { day: 'Sunday', hours: '12:45 PM - 5:30 PM' },
      { day: 'Monday', hours: '9:00 AM - 7:00 PM' },
      { day: 'Tuesday', hours: '8:30 AM - 7:00 PM' },
      { day: 'Wednesday', hours: '9:00 AM - 7:00 PM' },
      { day: 'Thursday', hours: '8:30 AM - 7:00 PM' },
      { day: 'Friday', hours: '8:30 AM - 7:30 PM' },
      { day: 'Saturday', hours: '8:00 AM - 4:00 PM' }
    ],
    policies: [
      { title: 'Deposit Policy', content: 'Matia Neblett requires a deposit to be paid at time of booking in order to secure an appointment. This deposit is non-refundable, and will be kept if you cancel without rescheduling.' },
      { title: 'No-Show / Late Cancellation Policy', content: 'If you cancel less than 24 hours prior or fail to show up at your appointment, your deposit will be kept and you will be charged the difference.' }
    ],
    services: [
      { id: 'm1', name: 'Loc Retwist nd two strand, Rope Twist, plaits', duration: 120, price: 120, description: 'Keep your locs going strong with a maintenance session. We\'ll wash, moisturize, incorporate new grow...', category: 'Top Services', isActive: true },
      { id: 'm2', name: 'Loc Retwist and style', duration: 135, price: 100, description: 'Full service loc retwist with custom styling included.', category: 'Top Services', isActive: true },
      { id: 'm3', name: 'Loc Re-twist', duration: 105, price: 100, description: 'Incorporate new hair growth and touch up existing twists for polished locs.', category: 'Top Services', isActive: true },
      { id: 'm4', name: 'Kid\'s Braids', duration: 120, price: 60, description: 'Braids for the little ones in your life.', category: 'Top Services', isActive: true },
      { id: 'm5', name: 'Loc Maintenance', duration: 90, price: 110, description: 'Keep your locs going strong with a maintenance session.', category: 'Top Services', isActive: true },
      { id: 's1', name: 'Kids Loc Maintenance', duration: 120, price: 80, description: 'Ages 12 & Under', category: 'Services', isActive: true },
      { id: 's2', name: 'Late fee', duration: 15, price: 20, description: 'Late fee for overdue arrivals.', category: 'Services', isActive: true },
      { id: 's3', name: 'Permanent color', duration: 150, price: 80, description: 'Change up your style with new color all over.', category: 'Services', isActive: true }
    ],
    reviews: [],
    availability: ['9:00 AM', '10:30 AM', '1:00 PM', '3:30 PM']
  },
  {
    id: '1',
    name: 'Veronica Smith',
    specialty: 'Ashburn, VA 8.3 mi',
    bio: 'Precision cuts and specialized extensions for an elite look.',
    rating: 5.0,
    reviewCount: 200,
    distance: '8.3 mi',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    gallery: ['https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=400'],
    address: 'Ashburn, VA',
    claimed: true,
    services: [{ id: 's1', name: 'Elite Haircut', duration: 45, price: 65, description: 'Premium cut and styling.', isActive: true }],
    reviews: [],
    availability: ['9:00 AM', '10:00 AM']
  },
  {
    id: '2',
    name: 'Jackie',
    specialty: 'Jessup, MD 31.4 mi',
    bio: 'Urban precision and classic styling for modern clients.',
    rating: 5.0,
    reviewCount: 176,
    distance: '31.4 mi',
    imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=200',
    gallery: ['https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=400'],
    address: 'Jessup, MD',
    claimed: true,
    services: [],
    reviews: [],
    availability: ['11:00 AM']
  }
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Find Barbers Near Me: Your Local Haircut Directory',
    date: 'February 13, 2026',
    category: 'Resources',
    comments: 0,
    excerpt: 'Find top-notch barbers nearby with expert tips for quality cuts.',
    imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1200'
  }
];
