import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Clock, BarChart2 } from 'lucide-react';
import { VALUE_ADDITIONS } from '../../utils/dummyData';
import Button from '../../components/ui/Button';

const demandColors = { 'Very High': 'text-green-600 bg-green-50', 'High': 'text-blue-600 bg-blue-50', 'Growing': 'text-purple-600 bg-purple-50' };

export default function ValueAddition() {
  const [crop, setCrop] = useState('');
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!crop.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const key = crop.toLowerCase().trim();
    const result = VALUE_ADDITIONS[key] || VALUE_ADDITIONS['turmeric'];
    setSuggestions(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Value Addition Suggestions</h1>
        <p className="text-gray-500 mt-1">Discover how to transform your crops into high-value products</p>
      </div>

      {/* Search */}
      <div className="card p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Enter Your Crop</h2>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={crop} onChange={e => setCrop(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder="e.g. turmeric, coconut, rice..." className="input-field pl-10" />
          </div>
          <Button onClick={handleSearch} loading={loading} size="lg">Get Suggestions</Button>
        </div>
        <div className="flex gap-2 mt-3">
          {['turmeric', 'coconut', 'rice'].map(c => (
            <button key={c} onClick={() => { setCrop(c); }} className="px-3 py-1.5 bg-gray-100 hover:bg-primary-50 hover:text-primary-600 rounded-lg text-sm font-medium text-gray-600 transition-colors capitalize">
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {suggestions && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-bold text-gray-900 mb-4 text-lg">
            💡 Suggested Value-Added Products for <span className="text-primary-600 capitalize">{crop}</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {suggestions.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card p-5 hover:border-primary-200 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{item.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{item.product}</h3>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div className="bg-green-50 rounded-xl p-3">
                        <div className="flex items-center gap-1 text-green-600 mb-1">
                          <TrendingUp size={14} />
                          <span className="text-xs font-medium">Profit Margin</span>
                        </div>
                        <p className="text-xl font-bold text-green-700">{item.profitMargin}</p>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-3">
                        <div className="flex items-center gap-1 text-blue-600 mb-1">
                          <Clock size={14} />
                          <span className="text-xs font-medium">Shelf Life</span>
                        </div>
                        <p className="text-xl font-bold text-blue-700">{item.shelfLife}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <BarChart2 size={14} className="text-gray-400" />
                        <span className="text-xs text-gray-500">Market Demand:</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${demandColors[item.demand]}`}>{item.demand}</span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.investment === 'Low' ? 'bg-green-100 text-green-700' : item.investment === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                        {item.investment} Investment
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
