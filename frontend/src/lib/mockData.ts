export const categories = [
  { _id: '1', name: 'Plumbing', icon: '🔧', count: 45 },
  { _id: '2', name: 'Electrical', icon: '⚡', count: 38 },
  { _id: '3', name: 'Carpentry', icon: '🪚', count: 29 },
  { _id: '4', name: 'Painting', icon: '🎨', count: 52 },
  { _id: '5', name: 'Cleaning', icon: '🧹', count: 67 },
  { _id: '6', name: 'AC & Cooling', icon: '❄️', count: 31 },
  { _id: '7', name: 'Roofing', icon: '🏠', count: 18 },
  { _id: '8', name: 'Landscaping', icon: '🌿', count: 24 },
];

export const featuredArtisans = [
  { _id: '1', name: 'Adebayo Okon', category: 'Plumbing', rating: 4.9, reviews: 127, avatar: '', location: 'Lagos', yearsExp: 12 },
  { _id: '2', name: 'Chioma Eze', category: 'Electrical', rating: 4.8, reviews: 98, avatar: '', location: 'Abuja', yearsExp: 8 },
  { _id: '3', name: 'Ibrahim Musa', category: 'Carpentry', rating: 4.7, reviews: 85, avatar: '', location: 'Kano', yearsExp: 15 },
  { _id: '4', name: 'Grace Adeyemi', category: 'Painting', rating: 4.9, reviews: 143, avatar: '', location: 'Lagos', yearsExp: 10 },
];

export const services = [
  { _id: '1', title: 'Emergency Pipe Repair', category: 'Plumbing', artisan: featuredArtisans[0], price: 15000, description: 'Quick and professional pipe repair service for leaks, bursts, and blockages.', rating: 4.9, reviewCount: 45, image: '' },
  { _id: '2', title: 'Full House Wiring', category: 'Electrical', artisan: featuredArtisans[1], price: 85000, description: 'Complete electrical wiring for new builds and renovations with safety certification.', rating: 4.8, reviewCount: 32, image: '' },
  { _id: '3', title: 'Custom Furniture Build', category: 'Carpentry', artisan: featuredArtisans[2], price: 45000, description: 'Bespoke furniture crafted to your exact specifications using quality hardwood.', rating: 4.7, reviewCount: 28, image: '' },
  { _id: '4', title: 'Interior Wall Painting', category: 'Painting', artisan: featuredArtisans[3], price: 25000, description: 'Professional interior painting with premium paints. Includes surface preparation.', rating: 4.9, reviewCount: 56, image: '' },
  { _id: '5', title: 'Bathroom Renovation', category: 'Plumbing', artisan: featuredArtisans[0], price: 120000, description: 'Complete bathroom plumbing overhaul including fixtures and fittings.', rating: 4.8, reviewCount: 22, image: '' },
  { _id: '6', title: 'Solar Panel Installation', category: 'Electrical', artisan: featuredArtisans[1], price: 250000, description: 'Professional solar panel setup with inverter and battery configuration.', rating: 4.9, reviewCount: 18, image: '' },
];

export const mockRequests = [
  { _id: '1', service: services[0], customer: { name: 'John Customer' }, status: 'pending' as const, date: '2026-02-15', description: 'Kitchen sink leaking badly', budget: 15000 },
  { _id: '2', service: services[3], customer: { name: 'John Customer' }, status: 'accepted' as const, date: '2026-02-12', description: 'Need living room repainted', budget: 25000 },
  { _id: '3', service: services[1], customer: { name: 'Jane Doe' }, status: 'completed' as const, date: '2026-02-01', description: 'Rewire the entire ground floor', budget: 85000 },
];

export const mockReviews = [
  { _id: '1', customer: { name: 'Funke A.' }, rating: 5, comment: 'Excellent work! Fixed the leak in under an hour. Very professional.', date: '2026-02-10' },
  { _id: '2', customer: { name: 'Emeka O.' }, rating: 4, comment: 'Good job overall. Could improve on punctuality but quality of work is top notch.', date: '2026-02-05' },
  { _id: '3', customer: { name: 'Amina B.' }, rating: 5, comment: 'Best plumber I have ever hired. Will definitely use again!', date: '2026-01-28' },
];

export const platformStats = {
  totalUsers: 12450,
  totalArtisans: 3200,
  totalCustomers: 9250,
  totalServices: 856,
  totalRequests: 4521,
  totalRevenue: 15600000,
  monthlyGrowth: 12.5,
};
