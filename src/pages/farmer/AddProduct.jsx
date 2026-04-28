import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Upload, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { productAPI } from '../../services/api';
import { CATEGORIES } from '../../utils/dummyData';
import FormInput from '../../components/ui/FormInput';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

const BADGES = ['Organic', 'Handmade', 'Traditional', 'Eco-Friendly'];

export default function AddProduct() {
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const toggleBadge = (badge) =>
    setSelectedBadges(prev => prev.includes(badge) ? prev.filter(b => b !== badge) : [...prev, badge]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        name: data.name,
        description: data.description,
        category: data.category,
        price: parseFloat(data.price),
        unit: data.unit,
        stock: parseInt(data.stock),
        moq: parseInt(data.moq) || 1,
        badges: selectedBadges.join(','),
        imageUrl: imagePreview || null,
      };
      await productAPI.add(payload);
      toast.success('Product added successfully!');
      reset();
      setSelectedBadges([]);
      setImagePreview(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-500 mt-1">List your farm product for global buyers</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image URL</label>
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-primary-300 transition-colors">
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-xl" />
                  <button type="button" onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload size={32} className="mx-auto text-gray-300" />
                  <input type="text" placeholder="Paste image URL here (e.g. https://...)"
                    className="input-field text-sm" onChange={e => setImagePreview(e.target.value)} />
                </div>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <FormInput label="Product Name" placeholder="e.g. Organic Turmeric Powder" error={errors.name?.message}
              {...register('name', { required: 'Product name is required' })} />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select className="input-field" {...register('category', { required: true })}>
                <option value="">Select category</option>
                {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.icon} {c.name}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea rows={3} placeholder="Describe your product..." className="input-field resize-none"
              {...register('description', { required: 'Description is required' })} />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FormInput label="Price ($)" type="number" step="0.01" placeholder="0.00" error={errors.price?.message}
              {...register('price', { required: 'Price is required', min: { value: 0.01, message: 'Must be > 0' } })} />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Unit</label>
              <select className="input-field" {...register('unit')}>
                <option value="kg">kg</option>
                <option value="litre">litre</option>
                <option value="piece">piece</option>
                <option value="dozen">dozen</option>
                <option value="quintal">quintal</option>
              </select>
            </div>
            <FormInput label="Stock Qty" type="number" placeholder="500" error={errors.stock?.message}
              {...register('stock', { required: 'Stock is required', min: 1 })} />
          </div>

          <FormInput label="Minimum Order Quantity (MOQ)" type="number" placeholder="10"
            {...register('moq')} />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Badges</label>
            <div className="flex flex-wrap gap-2">
              {BADGES.map(badge => (
                <button key={badge} type="button" onClick={() => toggleBadge(badge)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${selectedBadges.includes(badge) ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                  {badge}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={loading} size="lg" className="flex-1 gap-2">
              <Plus size={18} /> Add Product
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={() => { reset(); setSelectedBadges([]); setImagePreview(null); }}>
              Reset
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
