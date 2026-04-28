import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { orderAPI } from '../../services/api';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

const statusColors = {
  DELIVERED: 'bg-green-100 text-green-700',
  PROCESSING: 'bg-blue-100 text-blue-700',
  SHIPPED: 'bg-purple-100 text-purple-700',
  PENDING: 'bg-amber-100 text-amber-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderAPI.getAll()
      .then(({ data }) => setOrders(data))
      .catch(() => toast.error('Failed to load orders'))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const { data } = await orderAPI.updateStatus(id, status);
      setOrders(prev => prev.map(o => o.id === id ? data : o));
      toast.success(`Order #${id} updated to ${status}`);
    } catch {
      toast.error('Failed to update order');
    }
  };

  const counts = {
    Total: orders.length,
    Pending: orders.filter(o => o.status === 'PENDING').length,
    Shipped: orders.filter(o => o.status === 'SHIPPED').length,
    Delivered: orders.filter(o => o.status === 'DELIVERED').length,
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders Monitoring</h1>
        <p className="text-gray-500 mt-1">Monitor and manage all platform orders</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {Object.entries(counts).map(([label, count]) => (
          <div key={label} className="card p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{count}</p>
            <p className="text-sm font-medium text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="p-16 text-center">
            <div className="text-5xl mb-3">📋</div>
            <p className="text-gray-500">No orders yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Order ID', 'Product', 'Buyer', 'Qty', 'Total', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order, i) => (
                  <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                    className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-medium text-primary-600">#{order.id}</td>
                    <td className="py-4 px-4 text-gray-700 max-w-[140px] truncate">{order.productName}</td>
                    <td className="py-4 px-4 text-gray-600">{order.buyerName}</td>
                    <td className="py-4 px-4 text-gray-600">{order.quantity}</td>
                    <td className="py-4 px-4 font-semibold text-gray-900">${order.totalPrice}</td>
                    <td className="py-4 px-4">
                      <span className={`badge ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>{order.status}</span>
                    </td>
                    <td className="py-4 px-4">
                      <select value={order.status}
                        onChange={e => updateStatus(order.id, e.target.value)}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-primary-500">
                        {['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
