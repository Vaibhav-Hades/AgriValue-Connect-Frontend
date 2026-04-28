import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Globe, TrendingUp, ChevronRight, Play } from 'lucide-react';
import { PRODUCTS, FARMERS, CATEGORIES, TESTIMONIALS } from '../../utils/dummyData';
import ProductCard from '../../components/common/ProductCard';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

export default function LandingPage() {
  const handleAddToCart = (product) => toast.success(`${product.name} added to cart!`);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="bg-hero relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-green-200 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Connecting 10,000+ Farmers Globally
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                From Farm to <span className="text-gradient bg-gradient-to-r from-green-300 to-amber-300" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Global Markets</span>
              </h1>
              <p className="text-lg text-green-100 mt-6 leading-relaxed max-w-lg">
                Transform your crops into premium value-added products. Connect with international buyers and grow your agricultural business.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/register"><Button size="lg" className="bg-white text-primary-700 hover:bg-green-50 shadow-xl">Start Selling <ArrowRight size={18} /></Button></Link>
                <Link to="/products"><Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">Explore Products</Button></Link>
              </div>
              <div className="flex items-center gap-8 mt-10">
                {[['10K+', 'Farmers'], ['50K+', 'Products'], ['120+', 'Countries']].map(([num, label]) => (
                  <div key={label}>
                    <p className="text-2xl font-bold text-white">{num}</p>
                    <p className="text-green-300 text-sm">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="hidden lg:block">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80" alt="Farmer" className="rounded-3xl shadow-2xl w-full object-cover h-[500px]" />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-2xl">🌾</div>
                    <div>
                      <p className="font-bold text-gray-900">₹2.4L earned</p>
                      <p className="text-xs text-gray-500">by Ravi Kumar this month</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-3 shadow-xl">
                  <div className="flex items-center gap-2">
                    <Star size={16} className="fill-amber-400 text-amber-400" />
                    <span className="font-bold text-gray-900">4.9</span>
                    <span className="text-xs text-gray-500">avg rating</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle mx-auto">Simple steps to transform your farm produce into global business</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: '🌱', title: 'Register & List', desc: 'Create your farmer profile and list your crops or value-added products with photos and pricing.' },
              { step: '02', icon: '💡', title: 'Add Value', desc: 'Use our AI-powered suggestions to convert raw crops into premium products with higher margins.' },
              { step: '03', icon: '🌍', title: 'Sell Globally', desc: 'Connect with verified international buyers, negotiate prices, and grow your business.' },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.15 }} className="relative text-center p-8 rounded-3xl bg-gradient-to-b from-primary-50 to-white border border-primary-100">
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="absolute top-6 right-6 text-6xl font-black text-primary-100">{item.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-title">Browse Categories</h2>
              <p className="text-gray-500 mt-2">Explore our wide range of agricultural products</p>
            </div>
            <Link to="/products" className="text-primary-600 font-medium flex items-center gap-1 hover:gap-2 transition-all text-sm">View All <ChevronRight size={16} /></Link>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, i) => (
              <motion.div key={cat.id} {...fadeUp} transition={{ delay: i * 0.08 }}>
                <Link to={`/products?category=${cat.name}`} className="card p-5 text-center hover:border-primary-200 hover:shadow-md transition-all group block">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
                  <p className="font-semibold text-gray-800 text-sm">{cat.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{cat.count} products</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-title">Featured Products</h2>
              <p className="text-gray-500 mt-2">Handpicked premium products from verified farmers</p>
            </div>
            <Link to="/products" className="text-primary-600 font-medium flex items-center gap-1 hover:gap-2 transition-all text-sm">View All <ChevronRight size={16} /></Link>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Farmers */}
      <section className="py-20 bg-gradient-to-br from-primary-900 to-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Meet Our Top Farmers</h2>
            <p className="text-primary-200 mt-3">Real stories from farmers who transformed their lives</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FARMERS.map((farmer, i) => (
              <motion.div key={farmer.id} {...fadeUp} transition={{ delay: i * 0.1 }} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition-colors">
                <img src={farmer.image} alt={farmer.name} className="w-16 h-16 rounded-2xl object-cover mb-4" />
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-white">{farmer.name}</h3>
                  {farmer.verified && <Shield size={14} className="text-green-400" />}
                </div>
                <p className="text-primary-200 text-sm mb-2">{farmer.village}</p>
                <p className="text-primary-100 text-xs leading-relaxed line-clamp-3">{farmer.story}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-primary-300">{farmer.products} products</span>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span className="text-white text-xs font-medium">{farmer.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/farmers"><Button size="lg" className="bg-white text-primary-700 hover:bg-green-50">View All Farmers <ArrowRight size={18} /></Button></Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="section-title">Why Choose AgriValue Connect?</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Globe size={28} />, title: 'Global Reach', desc: 'Connect with buyers from 120+ countries', color: 'text-blue-600 bg-blue-50' },
              { icon: <Shield size={28} />, title: 'Verified Farmers', desc: 'All farmers are KYC verified and certified', color: 'text-green-600 bg-green-50' },
              { icon: <TrendingUp size={28} />, title: 'Smart Pricing', desc: 'AI-powered pricing for maximum profit', color: 'text-purple-600 bg-purple-50' },
              { icon: <Star size={28} />, title: 'Quality Assured', desc: 'Every product meets international standards', color: 'text-amber-600 bg-amber-50' },
            ].map((f, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="card p-6 text-center">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${f.color}`}>{f.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="section-title">What Buyers Say</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.id} {...fadeUp} transition={{ delay: i * 0.1 }} className="card p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={16} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-gray-600 leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-3 mt-5">
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-earth-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Farm?</h2>
            <p className="text-green-100 text-lg mb-8">Join thousands of farmers already earning more with AgriValue Connect</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/register?role=farmer"><Button size="lg" className="bg-white text-primary-700 hover:bg-green-50 shadow-xl">Join as Farmer</Button></Link>
              <Link to="/register?role=buyer"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">Join as Buyer</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
