import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, XCircle, Eye } from 'lucide-react';
import { productAPI } from '../../services/api';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { ProductCardSkeleton } from '../../components/ui/LoadingSkeleton';
import toast from 'react-hot-toast';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    productAPI.getAll()
      .then(({ data }) => setProducts(data))
      .catch(() => toast.error('Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await productAPI.delete(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Product deleted');
    } catch {
      toast.error('Failed to delete product');
    }
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.farmerName?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[...Array(6)].map((_, i) => <ProductCardSkeleton key={i} />)}
    </div>
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>
        <p className="text-gray-500 mt-1">{products.length} total products</p>
      </div>

      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search products or farmers..." className="input-field pl-10" />
      </div>

      {filtered.length === 0 ? (
        <div className="card p-16 text-center">
          <div className="text-5xl mb-3">📦</div>
          <p className="text-gray-500">No products found</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((product, i) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }} className="card overflow-hidden">
              <div className="relative">
                <img src={product.imageUrl || 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80'}
                  alt={product.name} className="w-full h-40 object-cover" />
                {product.badges && (
                  <div className="absolute top-2 left-2 flex gap-1">
                    {product.badges.split(',').slice(0, 1).map(b => <Badge key={b} label={b.trim()} />)}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.farmerName} • {product.farmerVillage}</p>
                <p className="text-primary-600 font-bold mt-1">${product.price}/{product.unit}</p>
                <div className="flex gap-2 mt-3">
                  <a href={`/products/${product.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full gap-1"><Eye size={13} /> View</Button>
                  </a>
                  <Button size="sm" variant="danger" className="gap-1" onClick={() => handleDelete(product.id)}>
                    <XCircle size={13} /> Delete
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
