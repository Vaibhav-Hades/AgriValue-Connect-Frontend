import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Eye, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productAPI } from '../../services/api';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { ProductCardSkeleton } from '../../components/ui/LoadingSkeleton';
import toast from 'react-hot-toast';

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await productAPI.getMyProducts();
      setProducts(data);
    } catch {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await productAPI.delete(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Product deleted');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete product');
    }
  };

  if (loading) return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[...Array(6)].map((_, i) => <ProductCardSkeleton key={i} />)}
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
          <p className="text-gray-500 mt-1">{products.length} products listed</p>
        </div>
        <Link to="/farmer/add-product"><Button className="gap-2"><Plus size={16} /> Add Product</Button></Link>
      </div>

      {products.length === 0 ? (
        <div className="card p-16 text-center">
          <div className="text-5xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-700">No products yet</h3>
          <p className="text-gray-400 mt-2">Add your first product to start selling</p>
          <Link to="/farmer/add-product" className="mt-4 inline-block">
            <Button className="gap-2"><Plus size={16} /> Add Product</Button>
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product, i) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }} className="card overflow-hidden">
              <div className="relative">
                <img src={product.imageUrl || 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80'}
                  alt={product.name} className="w-full h-40 object-cover" />
                {product.badges && (
                  <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                    {product.badges.split(',').slice(0, 1).map(b => <Badge key={b} label={b.trim()} />)}
                  </div>
                )}
                <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium ${product.stock > 100 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {product.stock > 100 ? 'In Stock' : 'Low Stock'}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{product.category}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold text-primary-700">${product.price}/{product.unit}</span>
                  <span className="text-xs text-gray-400">{product.stock} {product.unit} left</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <Link to={`/products/${product.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full gap-1"><Eye size={13} /> View</Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="gap-1 text-blue-600 hover:bg-blue-50"
                    onClick={() => toast('Edit coming soon', { icon: '✏️' })}>
                    <Edit2 size={13} />
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1 text-red-500 hover:bg-red-50"
                    onClick={() => handleDelete(product.id)}>
                    <Trash2 size={13} />
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
