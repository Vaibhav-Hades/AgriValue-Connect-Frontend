import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
        <div className="text-9xl font-black text-primary-100 mb-4">404</div>
        <div className="text-6xl mb-6">🌾</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Page Not Found</h1>
        <p className="text-gray-500 mb-8">Looks like this field hasn't been planted yet. Let's get you back to familiar ground.</p>
        <div className="flex gap-3 justify-center">
          <Link to="/"><Button size="lg" className="gap-2"><Home size={18} /> Go Home</Button></Link>
          <Button variant="outline" size="lg" onClick={() => window.history.back()} className="gap-2"><ArrowLeft size={18} /> Go Back</Button>
        </div>
      </motion.div>
    </div>
  );
}
