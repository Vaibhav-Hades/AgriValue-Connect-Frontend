import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Package, Send } from 'lucide-react';
import { inquiryAPI } from '../../services/api';
import { CATEGORIES } from '../../utils/dummyData';
import FormInput from '../../components/ui/FormInput';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

export default function BulkRequest() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await inquiryAPI.submit({
        productName: data.product,
        category: data.category,
        quantity: parseInt(data.quantity),
        unit: data.unit,
        budget: parseFloat(data.budget),
        message: data.requirements || '',
        deadline: data.deadline,
      });
      toast.success('Bulk request submitted! Farmers will contact you shortly.');
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bulk Request</h1>
        <p className="text-gray-500 mt-1">Submit a bulk purchase request and let farmers come to you</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[['📦', 'Submit Request', 'Fill in your requirements'],
          ['🌾', 'Farmers Respond', 'Get quotes from verified farmers'],
          ['✅', 'Choose & Order', 'Select the best offer']].map(([icon, title, desc]) => (
          <div key={title} className="card p-4 text-center">
            <div className="text-3xl mb-2">{icon}</div>
            <p className="font-semibold text-gray-900 text-sm">{title}</p>
            <p className="text-xs text-gray-500 mt-1">{desc}</p>
          </div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
        <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
          <Package size={18} className="text-primary-600" /> Request Details
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput label="Product Name" placeholder="e.g. Organic Turmeric Powder" error={errors.product?.message}
            {...register('product', { required: 'Product name is required' })} />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select className="input-field" {...register('category', { required: true })}>
              <option value="">Select category</option>
              {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.icon} {c.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Quantity Required" type="number" placeholder="500" error={errors.quantity?.message}
              {...register('quantity', { required: 'Quantity is required', min: 1 })} />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Unit</label>
              <select className="input-field" {...register('unit')}>
                <option value="kg">kg</option>
                <option value="litre">litre</option>
                <option value="quintal">quintal</option>
                <option value="ton">ton</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Budget per Unit ($)" type="number" step="0.01" placeholder="10.00"
              {...register('budget', { required: 'Budget is required' })} />
            <FormInput label="Required By Date" type="date"
              {...register('deadline', { required: 'Deadline is required' })} />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Special Requirements</label>
            <textarea rows={3} className="input-field resize-none"
              placeholder="Organic certification, specific packaging, quality standards..."
              {...register('requirements')} />
          </div>
          <Button type="submit" loading={loading} size="lg" className="w-full gap-2">
            <Send size={16} /> Submit Bulk Request
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
