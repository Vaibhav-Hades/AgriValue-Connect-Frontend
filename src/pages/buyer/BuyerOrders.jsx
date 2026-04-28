import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { orderAPI } from '../../services/api';
import toast from 'react-hot-toast';

const statusColors = {
  DELIVERED: 'bg-green-100 text-green-700',
  PROCESSING: 'bg-blue-100 text-blue-700',
  SHIPPED: 'bg-purple-100 text-purple-700',
  PENDING: 'bg-amber-100 text-amber-700',
  CANCELLED: 'bg-red-100 text-red-700',
};
const STEPS = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'];

export default function BuyerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderAPI.getMyOrders()
      .then(({ data }) => setOrders(data))
      .catch(() => toast.error('Failed to load orders'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20 text-gray-400">Loading orders...</div>;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-500 mt-1">Track all your purchases</p>
      </div>

      {orders.length === 0 ? (
        <div className="card p-16 text-center">
          <div className="text-5xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-700">No orders yet</h3>
          <p className="text-gray-400 mt-2">Browse products and place your first order</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, i) => (
            <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }} className="card p-5">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-primary-600">#{order.id}</span>
                    <span className={`badge ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>{order.status}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mt-1">{order.productName}</h3>
                  <p className="text-sm text-gray-500">
                    Qty: {order.quantity} • Ordered: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '-'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">${order.totalPrice}</p>
                </div>
              </div>

              {/* Progress tracker */}
              <div className="mt-4 flex items-center">
                {STEPS.map((step, idx) => {
                  const current = STEPS.indexOf(order.status);
                  const isActive = idx <= current;
                  return (
                    <div key={step} className="flex items-center flex-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isActive ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1 text-center">
                        <p className={`text-xs ${isActive ? 'text-primary-600 font-medium' : 'text-gray-400'}`}>{step}</p>
                      </div>
                      {idx < STEPS.length - 1 && (
                        <div className={`h-0.5 flex-1 ${idx < current ? 'bg-primary-600' : 'bg-gray-100'}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
