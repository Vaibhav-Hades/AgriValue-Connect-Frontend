import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { productAPI } from '../../services/api';
import { CATEGORIES } from '../../utils/dummyData';
import ProductCard from '../../components/common/ProductCard';
import { ProductCardSkeleton } from '../../components/ui/LoadingSkeleton';
import toast from 'react-hot-toast';

export default function ExploreProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch all products from backend on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await productAPI.getAll();
      setProducts(data);
    } catch {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // Search via backend when keyword changes (debounced)
  useEffect(() => {
    if (!search.trim()) { fetchProducts(); return; }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const { data } = await productAPI.search(search.trim());
        setProducts(data);
      } catch {
        toast.error('Search failed');
      } finally {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Filter by category via backend
  const handleCategorySelect = async (cat) => {
    setSelectedCategory(cat);
    setLoading(true);
    try {
      const { data } = cat ? await productAPI.getByCategory(cat) : await productAPI.getAll();
      setProducts(data);
    } catch {
      toast.error('Failed to filter products');
    } finally {
      setLoading(false);
    }
  };

  // Client-side sort + price filter on already-fetched data
  const displayed = [...products]
    .filter(p => p.price <= priceRange[1])
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  // Map backend field names to what ProductCard expects
  const normalise = (p) => ({
    ...p,
    farmer: p.farmerName,
    village: p.farmerVillage,
    image: p.imageUrl || `https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80`,
    badges: p.badges ? p.badges.split(',') : [],
    rating: 4.5,
    reviews: 0,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Explore Products</h1>
        <p className="text-gray-500 mt-1">Discover premium farm products from verified farmers</p>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search products, farmers..." className="input-field pl-10" />
        </div>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input-field w-auto min-w-[160px]">
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
        <button onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border font-medium text-sm transition-colors ${showFilters ? 'bg-primary-600 text-white border-primary-600' : 'border-gray-200 text-gray-600 hover:border-primary-300'}`}>
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="card p-5 mb-6">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Max Price: ${priceRange[1]}/unit</label>
              <input type="range" min="0" max="1000" value={priceRange[1]}
                onChange={e => setPriceRange([0, +e.target.value])} className="w-full accent-primary-600" />
            </div>
            <div className="flex items-end">
              <button onClick={() => { setSelectedCategory(''); setPriceRange([0, 1000]); setSearch(''); fetchProducts(); }}
                className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 font-medium">
                <X size={14} /> Clear Filters
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-6">
        <button onClick={() => handleCategorySelect('')}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${!selectedCategory ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-300'}`}>
          All
        </button>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => handleCategorySelect(c.name)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === c.name ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-300'}`}>
            {c.icon} {c.name}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500 mb-4">{displayed.length} products found</p>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      ) : displayed.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayed.map(p => (
            <ProductCard key={p.id} product={normalise(p)}
              onAddToCart={(p) => toast.success(`${p.name} added to cart!`)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
          <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
