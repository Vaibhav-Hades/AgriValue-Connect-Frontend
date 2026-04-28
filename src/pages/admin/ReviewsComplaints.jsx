import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

const reviews = [
  { id: 1, user: 'James Wilson', product: 'Organic Turmeric Powder', rating: 5, comment: 'Excellent quality! Exactly as described. Will order again.', type: 'review', date: '2024-01-20', status: 'approved' },
  { id: 2, user: 'Sarah Chen', product: 'Cold-Pressed Coconut Oil', rating: 2, comment: 'Product arrived damaged. Packaging was poor.', type: 'complaint', date: '2024-01-19', status: 'pending' },
  { id: 3, user: 'Ahmed Al-Rashid', product: 'Himalayan Wild Honey', rating: 4, comment: 'Good quality honey. Delivery was a bit slow.', type: 'review', date: '2024-01-18', status: 'approved' },
  { id: 4, user: 'Liu Wei', product: 'Basmati Rice Premium', rating: 1, comment: 'Wrong product delivered. Need immediate resolution.', type: 'complaint', date: '2024-01-17', status: 'pending' },
];

export default function ReviewsComplaints() {
  const [items, setItems] = useState(reviews);
  const [filter, setFilter] = useState('all');

  const filtered = items.filter(r => filter === 'all' || r.type === filter);
  const resolve = (id) => { setItems(prev => prev.map(r => r.id === id ? { ...r, status: 'resolved' } : r)); toast.success('Marked as resolved'); };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reviews & Complaints</h1>
        <p className="text-gray-500 mt-1">Monitor user feedback and resolve issues</p>
      </div>

      <div className="flex gap-2">
        {['all', 'review', 'complaint'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize ${filter === f ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-300'}`}>
            {f === 'complaint' ? '⚠️' : '⭐'} {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`card p-5 border-l-4 ${item.type === 'complaint' ? 'border-l-red-400' : 'border-l-green-400'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`badge ${item.type === 'complaint' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {item.type === 'complaint' ? <AlertTriangle size={11} className="inline mr-1" /> : <Star size={11} className="inline mr-1" />}
                    {item.type}
                  </span>
                  <span className={`badge ${item.status === 'pending' ? 'bg-amber-100 text-amber-700' : item.status === 'resolved' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                    {item.status}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mt-2">{item.user}</h3>
                <p className="text-sm text-gray-500">Product: {item.product} • {item.date}</p>
                <div className="flex gap-0.5 mt-2">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} className={j < item.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />)}
                </div>
                <p className="text-gray-700 mt-2 text-sm leading-relaxed">"{item.comment}"</p>
              </div>
              {item.status === 'pending' && (
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" className="gap-1 bg-green-600 hover:bg-green-700" onClick={() => resolve(item.id)}><CheckCircle size={13} /> Resolve</Button>
                  <Button size="sm" variant="danger" className="gap-1" onClick={() => toast.error('Escalated to team')}><XCircle size={13} /></Button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
