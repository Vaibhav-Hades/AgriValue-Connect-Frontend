import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingCart, DollarSign, MessageCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { productAPI, orderAPI, inquiryAPI } from '../../services/api';
import StatsCard from '../../components/common/StatsCard';
import { useAuth } from '../../hooks/useAuth';
import { FARMER_STATS } from '../../utils/dummyData';

const statusColors = { DELIVERED: 'bg-green-100 text-green-700', PROCESSING: 'bg-blue-100 text-blue-700', SHIPPED: 'bg-purple-100 text-purple-700', PENDING: 'bg-amber-100 text-amber-700' };

export default function FarmerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ products: 0, orders: 0, inquiries: 0 });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [pRes, oRes, iRes] = await Promise.all([
          productAPI.getMyProducts(),
          orderAPI.getFarmerOrders(),
          inquiryAPI.getAll().catch(() => ({ data: [] })),
        ]);
        setStats({ products: pRes.data.length, orders: oRes.data.length, inquiries: iRes.data.length });
        setOrders(oRes.data.slice(0, 5));
      } catch {
        // fallback to dummy stats silently
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your farm today.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Products', value: loading ? '...' : stats.products, icon: Package, color: 'primary' },
          { title: 'Active Orders', value: loading ? '...' : stats.orders, icon: ShoppingCart, color: 'earth' },
          { title: 'Total Revenue', value: '$0', icon: DollarSign, color: 'blue' },
          { title: 'Inquiries', value: loading ? '...' : stats.inquiries, icon: MessageCircle, color: 'purple' },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <StatsCard {...s} />
          </motion.div>
        ))}
      </div>

      {/* Charts — use dummy monthly data for visual */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900">Revenue Overview</h2>
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Last 8 months</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={FARMER_STATS.monthlyData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => [`$${v}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2.5} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-5">
          <h2 className="font-bold text-gray-900 mb-5">Monthly Orders</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={FARMER_STATS.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="orders" fill="#d4851e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders from backend */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-gray-900">Recent Orders</h2>
          <a href="/farmer/orders" className="text-sm text-primary-600 font-medium hover:underline">View all</a>
        </div>
        {orders.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Order ID', 'Product', 'Buyer', 'Qty', 'Total', 'Status'].map(h => (
                    <th key={h} className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-2 font-medium text-primary-600">#{order.id}</td>
                    <td className="py-3 px-2 text-gray-700 max-w-[150px] truncate">{order.productName}</td>
                    <td className="py-3 px-2 text-gray-600">{order.buyerName}</td>
                    <td className="py-3 px-2 text-gray-600">{order.quantity}</td>
                    <td className="py-3 px-2 font-semibold text-gray-900">${order.totalPrice}</td>
                    <td className="py-3 px-2">
                      <span className={`badge ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
