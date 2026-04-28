import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Leaf, Phone } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import FormInput from '../../components/ui/FormInput';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState(searchParams.get('role') || 'farmer');
  const { register: registerUser, loading } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const result = await registerUser({ ...data, role });
    if (result.success) {
      toast.success('Account created successfully!');
      navigate(`/${result.user.role}/dashboard`);
    } else {
      toast.error(result.error || 'Registration failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-cream-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8">
          <div className="text-center mb-6">
            <Link to="/" className="inline-flex items-center gap-2 mb-5">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                <Leaf size={22} className="text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">AgriValue Connect</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          </div>

          {/* Role Selector */}
          <div className="grid grid-cols-3 gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
            {['farmer', 'buyer', 'admin'].map(r => (
              <button key={r} onClick={() => setRole(r)} className={`py-2 rounded-lg text-sm font-medium transition-all capitalize ${role === r ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                {r === 'farmer' ? '🌾' : r === 'buyer' ? '🛒' : '⚙️'} {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput label="Full Name" icon={User} placeholder="John Doe" error={errors.name?.message}
              {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Min 2 characters' } })} />
            <FormInput label="Email" type="email" icon={Mail} placeholder="you@example.com" error={errors.email?.message}
              {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} />
            <FormInput label="Phone" type="tel" icon={Phone} placeholder="+91 98765 43210" error={errors.phone?.message}
              {...register('phone', { required: 'Phone is required' })} />
            {role === 'farmer' && (
              <FormInput label="Village / Location" placeholder="e.g. Wayanad, Kerala" error={errors.village?.message}
                {...register('village', { required: 'Location is required' })} />
            )}
            <FormInput label="Password" type="password" icon={Lock} placeholder="••••••••" error={errors.password?.message}
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })} />
            <FormInput label="Confirm Password" type="password" icon={Lock} placeholder="••••••••" error={errors.confirmPassword?.message}
              {...register('confirmPassword', { required: 'Please confirm password', validate: v => v === watch('password') || 'Passwords do not match' })} />
            <Button type="submit" loading={loading} className="w-full" size="lg">Create Account</Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account? <Link to="/login" className="text-primary-600 font-medium hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
