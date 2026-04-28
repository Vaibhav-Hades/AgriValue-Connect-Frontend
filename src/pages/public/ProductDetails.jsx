import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Shield, MapPin, ArrowLeft, MessageCircle } from 'lucide-react';
import { productAPI, reviewAPI } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [pRes, rRes] = await Promise.all([
          productAPI.getById(id),
          reviewAPI.getByProduct(id),
        ]);
        setProduct(pRes.data);
        setReviews(rRes.data);
      } catch {
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleReview = async () => {
    if (!user) { toast.error('Please login to leave a review'); return; }
    setSubmitting(true);
    try {
      const { data } = await reviewAPI.add({ productId: Number(id), rating: reviewRating, comment: reviewText });
      setReviews(prev => [data, ...prev]);
      setReviewText('');
      toast.success('Review submitted!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-12">
      <LoadingSkeleton className="h-[450px]" />
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => <LoadingSkeleton key={i} className="h-8" />)}
      </div>
    </div>
  );

  if (!product) return <div className="text-center py-20 text-gray-500">Product not found</div>;

  const badges = product.badges ? product.badges.split(',') : [];
  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : 'N/A';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 mb-6 text-sm font-medium transition-colors">
        <ArrowLeft size={16} /> Back to Products
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="relative rounded-3xl overflow-hidden">
            <img src={product.imageUrl || 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&q=80'}
              alt={product.name} className="w-full h-[450px] object-cover" />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {badges.map(b => <Badge key={b} label={b.trim()} />)}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          <div>
            <p className="text-sm text-primary-600 font-medium mb-1">{product.category}</p>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < Math.round(avgRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
                ))}
              </div>
              <span className="font-semibold text-gray-900">{avgRating}</span>
              <span className="text-gray-400 text-sm">({reviews.length} reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-primary-700">${product.price}</span>
            <span className="text-gray-400">per {product.unit}</span>
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Minimum Order</p>
              <p className="font-semibold text-gray-900">{product.moq || 1} {product.unit}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Available Stock</p>
              <p className="font-semibold text-gray-900">{product.stock} {product.unit}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-2xl border border-primary-100">
            <div className="w-12 h-12 bg-primary-200 rounded-xl flex items-center justify-center text-xl">👨‍🌾</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900">{product.farmerName}</p>
                <Shield size={14} className="text-primary-600" />
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin size={12} /> {product.farmerVillage || 'India'}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1 gap-2" size="lg" onClick={() => toast.success('Added to cart!')}>
              <ShoppingCart size={18} /> Add to Cart
            </Button>
            <Button variant="outline" size="lg" onClick={() => toast.success('Added to wishlist!')}>
              <Heart size={18} />
            </Button>
            <Button variant="secondary" size="lg" onClick={() => toast.success('Inquiry sent!')}>
              <MessageCircle size={18} />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews ({reviews.length})</h2>

        {/* Add Review */}
        {user?.role === 'buyer' && (
          <div className="card p-5 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Write a Review</h3>
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n} onClick={() => setReviewRating(n)}>
                  <Star size={22} className={n <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
                </button>
              ))}
            </div>
            <textarea rows={3} value={reviewText} onChange={e => setReviewText(e.target.value)}
              placeholder="Share your experience with this product..."
              className="input-field resize-none mb-3" />
            <Button onClick={handleReview} loading={submitting} disabled={!reviewText.trim()}>
              Submit Review
            </Button>
          </div>
        )}

        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map(r => (
              <div key={r.id} className="card p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center font-bold text-primary-700 text-sm">
                    {r.userName?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{r.userName}</p>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{r.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
}
