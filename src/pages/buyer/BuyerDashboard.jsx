import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Package, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ORDERS } from '../../utils/dummyData';
import StatsCard from '../../components/common/StatsCard';
import { useAuth } from '../../hooks/useAuth';

const spendData = [
  { month: 'Jan', spend: 1200 }, { month: 'Feb', spend: 1800 }, { month: 'Mar', spend: 1400 },
  { month: 'Apr', spend: 2200 }, { month: 'May', spend: 1900 }, { month: 'Jun', spend: 2800 },
];
const statusColors = { Delivered: 'bg-green-100 text-green-700', Processing: 'bg-blue-100 text-blue-700', Shipped: 'bg-purple-100 text-purple-700', Pending: 'bg-amber-100 text-amber-700' };

export default function BuyerDashboard() {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name?.split(' ')[0]}! 👋</h1>
        <p className="text-gray-500 mt-1">Your buying activity at a glance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Orders', value: '24', change: '+3 this month', icon: ShoppingCart, color: 'primary' },
          { title: 'Wishlist Items', value: '12', change: '+2 added', icon: Heart, color: 'earth' },
          { title: 'Active Orders', value: '3', change: 'In progress', icon: Package, color: 'blue' },
          { title: 'Total Spent', value: '$11.3K', change: '+18% this month', icon: DollarSign, color: 'purple' },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <StatsCard {...s} />
          </motion.div>
        ))}
      </div>

      <div className="card p-5">
        <h2 className="font-bold text-gray-900 mb-5">Spending Overview</h2>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={spendData}>
            <defs>
              <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d4851e" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#d4851e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => [`$${v}`, 'Spent']} />
            <Area type="monotone" dataKey="spend" stroke="#d4851e" strokeWidth={2.5} fill="url(#colorSpend)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="card p-5">
        <h2 className="font-bold text-gray-900 mb-4">Recent Orders</h2>
        <div className="space-y-3">
          {ORDERS.slice(0, 4).map(order => (
            <div key={order.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-lg">📦</div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{order.product}</p>
                <p className="text-xs text-gray-500">{order.date}</p>
              </div>
              <span className="font-bold text-gray-900">${order.total}</span>
              <span className={`badge ${statusColors[order.status]}`}>{order.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
