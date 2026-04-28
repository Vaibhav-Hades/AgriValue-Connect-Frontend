import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { PRODUCTS } from '../../utils/dummyData';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

export default function Wishlist() {
  const [items, setItems] = useState(PRODUCTS.slice(2, 7));
  const remove = (id) => { setItems(prev => prev.filter(i => i.id !== id)); toast.success('Removed from wishlist'); };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
        <p className="text-gray-500 mt-1">{items.length} saved products</p>
      </div>

      {items.length === 0 ? (
        <div className="card p-16 text-center">
          <Heart size={56} className="mx-auto text-gray-200 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">Your wishlist is empty</h3>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card overflow-hidden">
              <div className="relative">
                <img src={item.image} alt={item.name} className="w-full h-44 object-cover" />
                <div className="absolute top-2 left-2 flex gap-1">{item.badges?.slice(0, 1).map(b => <Badge key={b} label={b} />)}</div>
                <button onClick={() => remove(item.id)} className="absolute top-2 right-2 p-2 bg-white/90 rounded-full text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                  <Trash2 size={15} />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 line-clamp-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{item.village}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xl font-bold text-primary-700">${item.price}/{item.unit}</span>
                  <Button size="sm" className="gap-1.5" onClick={() => toast.success(`${item.name} added to cart!`)}>
                    <ShoppingCart size={14} /> Add
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
