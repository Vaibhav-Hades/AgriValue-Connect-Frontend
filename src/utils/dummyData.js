// Dummy data for AgriValue Connect

export const CATEGORIES = [
  { id: 1, name: 'Grains & Cereals', icon: '🌾', count: 124, color: 'bg-amber-100 text-amber-700' },
  { id: 2, name: 'Fruits & Vegetables', icon: '🥦', count: 89, color: 'bg-green-100 text-green-700' },
  { id: 3, name: 'Dairy Products', icon: '🥛', count: 56, color: 'bg-blue-100 text-blue-700' },
  { id: 4, name: 'Spices & Herbs', icon: '🌿', count: 78, color: 'bg-orange-100 text-orange-700' },
  { id: 5, name: 'Oils & Extracts', icon: '🫙', count: 43, color: 'bg-yellow-100 text-yellow-700' },
  { id: 6, name: 'Processed Foods', icon: '🍯', count: 67, color: 'bg-red-100 text-red-700' },
];

export const PRODUCTS = [
  { id: 1, name: 'Organic Turmeric Powder', farmer: 'Ravi Kumar', farmerId: 1, village: 'Wayanad, Kerala', price: 12.5, unit: 'kg', category: 'Spices & Herbs', rating: 4.8, reviews: 124, badges: ['Organic', 'Traditional'], image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80', stock: 500, description: 'Pure sun-dried turmeric from the hills of Wayanad. Rich in curcumin, traditionally processed.', moq: 10 },
  { id: 2, name: 'Cold-Pressed Coconut Oil', farmer: 'Meena Pillai', farmerId: 2, village: 'Thrissur, Kerala', price: 18.0, unit: 'litre', category: 'Oils & Extracts', rating: 4.9, reviews: 89, badges: ['Organic', 'Handmade'], image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80', stock: 200, description: 'Traditional wood-pressed coconut oil. No chemicals, no heat processing.', moq: 5 },
  { id: 3, name: 'Himalayan Wild Honey', farmer: 'Suresh Thapa', farmerId: 3, village: 'Uttarakhand', price: 22.0, unit: 'kg', category: 'Processed Foods', rating: 4.7, reviews: 203, badges: ['Organic', 'Eco-Friendly'], image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80', stock: 150, description: 'Raw unfiltered honey from Himalayan forests. Collected by tribal beekeepers.', moq: 2 },
  { id: 4, name: 'Basmati Rice Premium', farmer: 'Harpreet Singh', farmerId: 4, village: 'Punjab', price: 8.5, unit: 'kg', category: 'Grains & Cereals', rating: 4.6, reviews: 312, badges: ['Traditional'], image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80', stock: 2000, description: 'Aged basmati rice with long grains and aromatic fragrance. Farm-to-table.', moq: 25 },
  { id: 5, name: 'Moringa Leaf Powder', farmer: 'Lakshmi Devi', farmerId: 5, village: 'Andhra Pradesh', price: 15.0, unit: 'kg', category: 'Spices & Herbs', rating: 4.8, reviews: 67, badges: ['Organic', 'Eco-Friendly'], image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', stock: 300, description: 'Nutrient-dense moringa powder. Shade-dried to preserve nutrients.', moq: 5 },
  { id: 6, name: 'Artisan Ghee', farmer: 'Gita Sharma', farmerId: 6, village: 'Rajasthan', price: 28.0, unit: 'kg', category: 'Dairy Products', rating: 4.9, reviews: 156, badges: ['Handmade', 'Traditional'], image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&q=80', stock: 100, description: 'Bilona method ghee from A2 cow milk. Slow-churned, golden, aromatic.', moq: 2 },
  { id: 7, name: 'Red Chilli Flakes', farmer: 'Venkat Rao', farmerId: 7, village: 'Guntur, AP', price: 9.0, unit: 'kg', category: 'Spices & Herbs', rating: 4.5, reviews: 88, badges: ['Organic'], image: 'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=400&q=80', stock: 800, description: 'Sun-dried Guntur chilli flakes. Fiery red, rich flavor.', moq: 10 },
  { id: 8, name: 'Jackfruit Chips', farmer: 'Thomas Mathew', farmerId: 8, village: 'Kottayam, Kerala', price: 11.0, unit: 'kg', category: 'Processed Foods', rating: 4.7, reviews: 45, badges: ['Handmade', 'Eco-Friendly'], image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&q=80', stock: 250, description: 'Crispy coconut oil fried jackfruit chips. Traditional Kerala snack.', moq: 5 },
];

export const FARMERS = [
  { id: 1, name: 'Ravi Kumar', village: 'Wayanad, Kerala', specialty: 'Spices & Herbs', products: 12, rating: 4.8, verified: true, story: 'Third-generation spice farmer who transformed his 5-acre farm into a certified organic operation. Ravi now exports to 15 countries.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', joined: '2021' },
  { id: 2, name: 'Meena Pillai', village: 'Thrissur, Kerala', specialty: 'Oils & Dairy', products: 8, rating: 4.9, verified: true, story: 'Meena revived the traditional wood-press oil extraction method in her village, creating employment for 20 women.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', joined: '2020' },
  { id: 3, name: 'Suresh Thapa', village: 'Uttarakhand', specialty: 'Forest Products', products: 5, rating: 4.7, verified: true, story: 'Suresh works with tribal communities to sustainably harvest wild honey and forest herbs from the Himalayas.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', joined: '2022' },
  { id: 4, name: 'Harpreet Singh', village: 'Punjab', specialty: 'Grains & Rice', products: 15, rating: 4.6, verified: true, story: 'Harpreet converted 50 acres to organic farming and now leads a cooperative of 30 farmers in Punjab.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80', joined: '2019' },
];

export const TESTIMONIALS = [
  { id: 1, name: 'James Wilson', role: 'Bulk Buyer, UK', text: 'AgriValue Connect helped me source authentic organic spices directly from Indian farmers. Quality is exceptional and pricing is fair.', rating: 5, avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80' },
  { id: 2, name: 'Sarah Chen', role: 'Restaurant Owner, Singapore', text: 'I found the most amazing cold-pressed oils here. The farmer stories make me feel connected to the source of my ingredients.', rating: 5, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80' },
  { id: 3, name: 'Ahmed Al-Rashid', role: 'Importer, UAE', text: 'The bulk request feature saved me hours of negotiation. Direct farmer contact and transparent pricing is a game changer.', rating: 5, avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&q=80' },
];

export const VALUE_ADDITIONS = {
  turmeric: [
    { product: 'Turmeric Powder', profitMargin: '40%', shelfLife: '24 months', demand: 'Very High', investment: 'Low', icon: '🌿' },
    { product: 'Turmeric Capsules', profitMargin: '120%', shelfLife: '36 months', demand: 'High', investment: 'Medium', icon: '💊' },
    { product: 'Turmeric Face Pack', profitMargin: '200%', shelfLife: '18 months', demand: 'Growing', investment: 'Low', icon: '✨' },
    { product: 'Turmeric Tea Blend', profitMargin: '150%', shelfLife: '12 months', demand: 'High', investment: 'Low', icon: '🍵' },
  ],
  coconut: [
    { product: 'Cold-Pressed Oil', profitMargin: '80%', shelfLife: '24 months', demand: 'Very High', investment: 'Medium', icon: '🫙' },
    { product: 'Coconut Milk Powder', profitMargin: '100%', shelfLife: '12 months', demand: 'High', investment: 'High', icon: '🥛' },
    { product: 'Coconut Sugar', profitMargin: '90%', shelfLife: '18 months', demand: 'Growing', investment: 'Medium', icon: '🍬' },
    { product: 'Desiccated Coconut', profitMargin: '60%', shelfLife: '6 months', demand: 'High', investment: 'Low', icon: '🥥' },
  ],
  rice: [
    { product: 'Rice Flour', profitMargin: '35%', shelfLife: '12 months', demand: 'Very High', investment: 'Low', icon: '🌾' },
    { product: 'Rice Bran Oil', profitMargin: '110%', shelfLife: '18 months', demand: 'High', investment: 'High', icon: '🫙' },
    { product: 'Puffed Rice Snacks', profitMargin: '150%', shelfLife: '6 months', demand: 'High', investment: 'Medium', icon: '🍿' },
    { product: 'Rice Protein Powder', profitMargin: '200%', shelfLife: '24 months', demand: 'Growing', investment: 'High', icon: '💪' },
  ],
};

export const ADMIN_STATS = {
  totalUsers: 1284, totalFarmers: 342, totalBuyers: 891, totalProducts: 2156,
  totalOrders: 4521, revenue: 284500, pendingApprovals: 23, activeDisputes: 7,
};

export const FARMER_STATS = {
  totalProducts: 12, activeOrders: 8, totalRevenue: 45200, pendingInquiries: 5,
  monthlyData: [
    { month: 'Jan', revenue: 3200, orders: 12 }, { month: 'Feb', revenue: 4100, orders: 15 },
    { month: 'Mar', revenue: 3800, orders: 14 }, { month: 'Apr', revenue: 5200, orders: 19 },
    { month: 'May', revenue: 4800, orders: 17 }, { month: 'Jun', revenue: 6100, orders: 22 },
    { month: 'Jul', revenue: 5500, orders: 20 }, { month: 'Aug', revenue: 7200, orders: 26 },
  ],
};

export const ORDERS = [
  { id: 'ORD-001', product: 'Organic Turmeric Powder', buyer: 'James Wilson', quantity: 50, unit: 'kg', total: 625, status: 'Delivered', date: '2024-01-15' },
  { id: 'ORD-002', product: 'Cold-Pressed Coconut Oil', buyer: 'Sarah Chen', quantity: 20, unit: 'litre', total: 360, status: 'Processing', date: '2024-01-18' },
  { id: 'ORD-003', product: 'Himalayan Wild Honey', buyer: 'Ahmed Al-Rashid', quantity: 30, unit: 'kg', total: 660, status: 'Shipped', date: '2024-01-20' },
  { id: 'ORD-004', product: 'Basmati Rice Premium', buyer: 'Liu Wei', quantity: 100, unit: 'kg', total: 850, status: 'Pending', date: '2024-01-22' },
  { id: 'ORD-005', product: 'Moringa Leaf Powder', buyer: 'Emma Davis', quantity: 15, unit: 'kg', total: 225, status: 'Delivered', date: '2024-01-10' },
];

export const MESSAGES = [
  { id: 1, from: 'James Wilson', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80', subject: 'Bulk order inquiry - Turmeric', message: 'Hi, I am interested in placing a bulk order of 500kg turmeric powder monthly. Can we discuss pricing?', time: '2 hours ago', unread: true },
  { id: 2, from: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80', subject: 'Quality certificate request', message: 'Could you please share the organic certification documents for your coconut oil?', time: '1 day ago', unread: true },
  { id: 3, from: 'Ahmed Al-Rashid', avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&q=80', subject: 'Shipping timeline', message: 'When can you ship the honey order? We need it before the 25th.', time: '2 days ago', unread: false },
];
