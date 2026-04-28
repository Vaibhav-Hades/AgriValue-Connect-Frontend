import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Package } from 'lucide-react';
import { PRODUCTS } from '../../utils/dummyData';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

export default function Inventory() {
  const inventory = PRODUCTS.slice(0, 6).map(p => ({
    ...p,
    status: p.stock > 200 ? 'good' : p.stock > 50 ? 'low' : 'critical',
  }));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
        <p className="text-gray-500 mt-1">Track and manage your product stock levels</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Products', value: inventory.length, icon: '📦', color: 'bg-blue-50 text-blue-700' },
          { label: 'Low Stock', value: inventory.filter(i => i.status === 'low').length, icon: '⚠️', color: 'bg-amber-50 text-amber-700' },
          { label: 'Critical', value: inventory.filter(i => i.status === 'critical').length, icon: '🚨', color: 'bg-red-50 text-red-700' },
        ].map(item => (
          <div key={item.label} className={`card p-4 ${item.color}`}>
            <div className="text-2xl mb-1">{item.icon}</div>
            <p className="text-2xl font-bold">{item.value}</p>
            <p className="text-sm font-medium">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Stock Levels</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {inventory.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{item.name}</p>
                <p className="text-xs text-gray-500">{item.category}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{item.stock} {item.unit}</p>
                <div className="w-24 bg-gray-100 rounded-full h-1.5 mt-1">
                  <div className={`h-1.5 rounded-full ${item.status === 'good' ? 'bg-green-500' : item.status === 'low' ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min((item.stock / 1000) * 100, 100)}%` }} />
                </div>
              </div>
              <div className="flex items-center gap-1">
                {item.status === 'good' ? <CheckCircle size={16} className="text-green-500" /> : <AlertTriangle size={16} className={item.status === 'critical' ? 'text-red-500' : 'text-amber-500'} />}
                <span className={`text-xs font-medium capitalize ${item.status === 'good' ? 'text-green-600' : item.status === 'low' ? 'text-amber-600' : 'text-red-600'}`}>{item.status}</span>
              </div>
              <Button size="sm" variant="outline" onClick={() => toast.success('Restock request sent!')}>Restock</Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
