import { motion } from 'framer-motion';
import { Star, Shield, Package, MapPin } from 'lucide-react';
import { FARMERS } from '../../utils/dummyData';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

export default function FarmersDirectory() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Our Farmers</h1>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">Meet the dedicated farmers behind every premium product. Real people, real stories.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {FARMERS.map((farmer, i) => (
          <motion.div key={farmer.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card p-6">
            <div className="flex gap-5">
              <img src={farmer.image} alt={farmer.name} className="w-20 h-20 rounded-2xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl font-bold text-gray-900">{farmer.name}</h3>
                  {farmer.verified && <span className="badge bg-blue-100 text-blue-700 flex items-center gap-1"><Shield size={10} /> Verified</span>}
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                  <MapPin size={13} /> {farmer.village}
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium">{farmer.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Package size={13} /> {farmer.products} products
                  </div>
                  <span className="text-xs text-gray-400">Since {farmer.joined}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-sm font-medium text-amber-800 mb-1">🌾 Farmer's Story</p>
              <p className="text-sm text-gray-600 leading-relaxed">{farmer.story}</p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-primary-600 font-medium bg-primary-50 px-3 py-1 rounded-full">{farmer.specialty}</span>
              <Button size="sm" onClick={() => toast.success(`Inquiry sent to ${farmer.name}!`)}>Contact Farmer</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
