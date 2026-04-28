import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, TrendingUp, Info } from 'lucide-react';
import FormInput from '../../components/ui/FormInput';
import Button from '../../components/ui/Button';

export default function SmartPricing() {
  const [result, setResult] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const rawCost = parseFloat(data.rawMaterial);
    const processing = parseFloat(data.processing);
    const packaging = parseFloat(data.packaging);
    const transport = parseFloat(data.transport);
    const overhead = parseFloat(data.overhead || 0);
    const margin = parseFloat(data.margin);

    const totalCost = rawCost + processing + packaging + transport + overhead;
    const suggestedPrice = totalCost * (1 + margin / 100);
    const profit = suggestedPrice - totalCost;
    const roi = ((profit / totalCost) * 100).toFixed(1);

    setResult({ totalCost: totalCost.toFixed(2), suggestedPrice: suggestedPrice.toFixed(2), profit: profit.toFixed(2), roi, margin });
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Smart Pricing Calculator</h1>
        <p className="text-gray-500 mt-1">Calculate the optimal selling price for your products</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="card p-6">
          <h2 className="font-semibold text-gray-900 mb-5 flex items-center gap-2">
            <Calculator size={18} className="text-primary-600" /> Enter Your Costs
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput label="Raw Material Cost ($)" type="number" step="0.01" placeholder="0.00" error={errors.rawMaterial?.message}
              {...register('rawMaterial', { required: 'Required', min: { value: 0, message: 'Must be ≥ 0' } })} />
            <FormInput label="Processing Cost ($)" type="number" step="0.01" placeholder="0.00" error={errors.processing?.message}
              {...register('processing', { required: 'Required', min: 0 })} />
            <FormInput label="Packaging Cost ($)" type="number" step="0.01" placeholder="0.00" error={errors.packaging?.message}
              {...register('packaging', { required: 'Required', min: 0 })} />
            <FormInput label="Transport Cost ($)" type="number" step="0.01" placeholder="0.00" error={errors.transport?.message}
              {...register('transport', { required: 'Required', min: 0 })} />
            <FormInput label="Overhead / Other ($)" type="number" step="0.01" placeholder="0.00"
              {...register('overhead', { min: 0 })} />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Desired Profit Margin (%)</label>
              <select className="input-field" {...register('margin', { required: true })}>
                {[20, 30, 40, 50, 60, 75, 100, 150].map(m => <option key={m} value={m}>{m}%</option>)}
              </select>
            </div>
            <Button type="submit" className="w-full gap-2" size="lg"><Calculator size={18} /> Calculate Price</Button>
          </form>
        </div>

        {/* Result */}
        <div className="space-y-4">
          {result ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
              <div className="card p-6 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
                <p className="text-primary-200 text-sm font-medium mb-1">Suggested Selling Price</p>
                <p className="text-5xl font-black">${result.suggestedPrice}</p>
                <p className="text-primary-200 text-sm mt-1">per unit</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="card p-4">
                  <p className="text-xs text-gray-500 mb-1">Total Cost</p>
                  <p className="text-2xl font-bold text-gray-900">${result.totalCost}</p>
                </div>
                <div className="card p-4 bg-green-50">
                  <p className="text-xs text-green-600 mb-1">Net Profit</p>
                  <p className="text-2xl font-bold text-green-700">${result.profit}</p>
                </div>
                <div className="card p-4 bg-blue-50">
                  <p className="text-xs text-blue-600 mb-1">Profit Margin</p>
                  <p className="text-2xl font-bold text-blue-700">{result.margin}%</p>
                </div>
                <div className="card p-4 bg-purple-50">
                  <p className="text-xs text-purple-600 mb-1">ROI</p>
                  <p className="text-2xl font-bold text-purple-700">{result.roi}%</p>
                </div>
              </div>
              <div className="card p-4 bg-amber-50 border border-amber-100">
                <div className="flex items-start gap-2">
                  <Info size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-700">Consider market competition and buyer's budget when finalizing your price. A {result.margin}% margin is {result.margin >= 50 ? 'excellent' : result.margin >= 30 ? 'good' : 'moderate'} for this product type.</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="card p-8 text-center text-gray-400 h-full flex flex-col items-center justify-center">
              <TrendingUp size={48} className="text-gray-200 mb-4" />
              <p className="font-medium">Enter your costs to calculate the optimal price</p>
              <p className="text-sm mt-1">Get AI-powered pricing recommendations</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
