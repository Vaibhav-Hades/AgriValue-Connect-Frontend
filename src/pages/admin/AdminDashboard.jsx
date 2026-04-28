import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Package, ShoppingCart, DollarSign, AlertCircle, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { userAPI } from '../../services/api';
import StatsCard from '../../components/common/StatsCard';
import { FARMER_STATS } from '../../utils/dummyData';

const COLORS = ['#16a34a', '#d4851e', '#3b82f6', '#8b5cf6'];

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userAPI.getAnalytics()
      .then(({ data }) => setAnalytics(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const pieData = analytics ? [
    { name: 'Farmers', value: analytics.totalFarmers },
    { name: 'Buyers', value: analytics.totalBuyers },
    { name: 'Admins', value: analytics.totalUsers - analytics.totalFarmers - analytics.totalBuyers },
  ] : [];

  const stats = analytics ? [
    { title: 'Total Users', value: analytics.totalUsers.toLocaleString(), icon: Users, color: 'primary' },
    { title: 'Total Products', value: analytics.totalProducts.toLocaleString(), icon: Package, color: 'earth' },
    { title: 'Total Orders', value: analytics.totalOrders.toLocaleString(), icon: ShoppingCart, color: 'blue' },
    { title: 'Pending Orders', value: analytics.pendingOrders.toLocaleString(), icon: DollarSign, color: 'purple' },
  ] : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Platform overview and management</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="card p-5 h-24 animate-pulse bg-gray-100" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <StatsCard {...s} />
            </motion.div>
          ))}
        </div>
      )}

      {analytics && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="card p-4 bg-amber-50 border border-amber-200 flex items-center gap-3">
            <Clock size={20} className="text-amber-600 shrink-0" />
            <div>
              <p className="font-semibold text-amber-800">{analytics.pendingOrders} Pending Orders</p>
              <p className="text-sm text-amber-600">Awaiting processing</p>
            </div>
          </div>
          <div className="card p-4 bg-green-50 border border-green-200 flex items-center gap-3">
            <AlertCircle size={20} className="text-green-600 shrink-0" />
            <div>
              <p className="font-semibold text-green-800">{analytics.deliveredOrders} Delivered Orders</p>
              <p className="text-sm text-green-600">Successfully completed</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-5">
          <h2 className="font-bold text-gray-900 mb-5">Monthly Revenue (Sample)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={FARMER_STATS.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => [`$${v * 10}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h2 className="font-bold text-gray-900 mb-5">User Distribution</h2>
          {pieData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-3">
                {pieData.map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-gray-600">{item.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-gray-400 py-8">No data yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
