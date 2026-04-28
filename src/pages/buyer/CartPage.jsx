import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { orderAPI } from '../../services/api';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

export default function CartPage() {
  const [cartItems, setCartItems] = useState(
    // Cart is managed client-side; items added via ProductCard
    JSON.parse(localStorage.getItem('agrivalue_cart') || '[]')
  );
  const [placing, setPlacing] = useState(false);

  const saveCart = (items) => {
    setCartItems(items);
    localStorage.setItem('agrivalue_cart', JSON.stringify(items));
  };

  const updateQty = (id, delta) => {
    saveCart(cartItems.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  };

  const remove = (id) => {
    saveCart(cartItems.filter(i => i.id !== id));
    toast.success('Item removed');
  };

  // Place each cart item as a separate order via backend
  const placeOrder = async () => {
    setPlacing(true);
    try {
      for (const item of cartItems) {
        await orderAPI.place({ productId: item.id, quantity: item.quantity });
      }
      toast.success('Order placed successfully!');
      saveCart([]);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Cart</h1>
        <p className="text-gray-500 mt-1">{cartItems.length} items in your cart</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="card p-16 text-center">
          <ShoppingBag size={56} className="mx-auto text-gray-200 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">Your cart is empty</h3>
          <p className="text-gray-400 mt-2">Browse products and add items to your cart</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence>
              {cartItems.map(item => (
                <motion.div key={item.id} layout exit={{ opacity: 0, x: -20 }} className="card p-4 flex items-center gap-4">
                  <img src={item.imageUrl || item.image || 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=100&q=80'}
                    alt={item.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.farmerVillage || item.village}</p>
                    <p className="text-primary-600 font-bold mt-1">${item.price}/{item.unit}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    <button onClick={() => remove(item.id)} className="text-red-400 hover:text-red-600 mt-1">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="card p-5 h-fit sticky top-24">
            <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Shipping</span><span className="text-green-600">Free</span></div>
              <div className="flex justify-between text-gray-600"><span>Tax (5%)</span><span>${(subtotal * 0.05).toFixed(2)}</span></div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-base">
                <span>Total</span><span>${(subtotal * 1.05).toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full mt-5 gap-2" size="lg" loading={placing} onClick={placeOrder}>
              Place Order <ArrowRight size={16} />
            </Button>
            <p className="text-xs text-gray-400 text-center mt-3">Secure checkout • 100% buyer protection</p>
          </div>
        </div>
      )}
    </div>
  );
}
