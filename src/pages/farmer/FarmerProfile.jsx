import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Camera, Save, MapPin, Phone, Mail } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import FormInput from '../../components/ui/FormInput';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

export default function FarmerProfile() {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit } = useForm({ defaultValues: { name: user?.name, email: user?.email, phone: '+91 98765 43210', village: user?.village || 'Wayanad, Kerala', bio: 'Third-generation spice farmer with 15 years of experience in organic farming.' } });

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
        <p className="text-gray-500 mt-1">Manage your farmer profile and information</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
        {/* Avatar */}
        <div className="flex items-center gap-5 mb-6 pb-6 border-b border-gray-100">
          <div className="relative">
            <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=16a34a&color=fff&size=100`}
              alt={user?.name} className="w-20 h-20 rounded-2xl object-cover" />
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-primary-700 transition-colors">
              <Camera size={14} />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-gray-500 text-sm capitalize">{user?.role}</p>
            <span className="badge bg-green-100 text-green-700 mt-1">✓ Verified Farmer</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <FormInput label="Full Name" icon={Camera} {...register('name')} />
            <FormInput label="Email" type="email" icon={Mail} {...register('email')} />
            <FormInput label="Phone" icon={Phone} {...register('phone')} />
            <FormInput label="Village / Location" icon={MapPin} {...register('village')} />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Bio / Story</label>
            <textarea rows={4} className="input-field resize-none" placeholder="Tell buyers about your farm and farming practices..."
              {...register('bio')} />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Specialization</label>
            <select className="input-field" {...register('specialty')}>
              <option>Spices & Herbs</option>
              <option>Grains & Cereals</option>
              <option>Fruits & Vegetables</option>
              <option>Dairy Products</option>
              <option>Oils & Extracts</option>
            </select>
          </div>
          <Button type="submit" loading={saving} size="lg" className="gap-2"><Save size={16} /> Save Changes</Button>
        </form>
      </motion.div>
    </div>
  );
}
