import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Camera, Save, Building, Globe } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import FormInput from '../../components/ui/FormInput';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

export default function BuyerProfile() {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit } = useForm({ defaultValues: { name: user?.name, email: user?.email, company: user?.company || 'Wilson Imports Ltd', country: 'United Kingdom', phone: '+44 20 7946 0958' } });

  const onSubmit = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    toast.success('Profile updated!');
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 mt-1">Manage your buyer account</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
        <div className="flex items-center gap-5 mb-6 pb-6 border-b border-gray-100">
          <div className="relative">
            <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=d4851e&color=fff&size=100`}
              alt={user?.name} className="w-20 h-20 rounded-2xl object-cover" />
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-earth-500 text-white rounded-full flex items-center justify-center shadow-md">
              <Camera size={14} />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-gray-500 text-sm">Verified Buyer</p>
            <span className="badge bg-blue-100 text-blue-700 mt-1">✓ KYC Verified</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <FormInput label="Full Name" {...register('name')} />
            <FormInput label="Email" type="email" {...register('email')} />
            <FormInput label="Company Name" icon={Building} {...register('company')} />
            <FormInput label="Country" icon={Globe} {...register('country')} />
            <FormInput label="Phone" {...register('phone')} />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Preferred Categories</label>
            <div className="flex flex-wrap gap-2">
              {['Spices & Herbs', 'Oils & Extracts', 'Grains & Cereals', 'Dairy Products'].map(cat => (
                <label key={cat} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl cursor-pointer hover:bg-primary-50 transition-colors">
                  <input type="checkbox" defaultChecked className="accent-primary-600" />
                  <span className="text-sm text-gray-700">{cat}</span>
                </label>
              ))}
            </div>
          </div>
          <Button type="submit" loading={saving} size="lg" className="gap-2"><Save size={16} /> Save Changes</Button>
        </form>
      </motion.div>
    </div>
  );
}
