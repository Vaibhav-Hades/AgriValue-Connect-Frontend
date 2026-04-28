import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

// Adds item to localStorage cart so CartPage can read it
function addToLocalCart(product) {
  const cart = JSON.parse(localStorage.getItem('agrivalue_cart') || '[]');
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('agrivalue_cart', JSON.stringify(cart));
}

export default function ProductCard({ product, onAddToCart, onWishlist }) {
  const handleAdd = () => {
    addToLocalCart(product);
    onAddToCart?.(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="card overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image || product.imageUrl || 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80'}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button
          onClick={() => onWishlist?.(product)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <Heart size={16} />
        </button>
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {product.badges?.slice(0, 2).map(b => <Badge key={b} label={b} />)}
        </div>
      </div>
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-500 mt-0.5">{product.village || product.farmerVillage}</p>
        {product.rating && (
          <div className="flex items-center gap-1 mt-2">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            {product.reviews !== undefined && <span className="text-xs text-gray-400">({product.reviews})</span>}
          </div>
        )}
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-xl font-bold text-primary-700">${product.price}</span>
            <span className="text-xs text-gray-400">/{product.unit}</span>
          </div>
          <Button size="sm" onClick={handleAdd} className="gap-1.5">
            <ShoppingCart size={14} /> Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
