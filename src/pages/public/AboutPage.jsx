import { motion } from 'framer-motion';
import { Leaf, Target, Users, Globe, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Leaf size={32} className="text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">About AgriValue Connect</h1>
            <p className="text-xl text-primary-200 leading-relaxed">We're on a mission to empower farmers by bridging the gap between rural agriculture and global markets through technology and innovation.</p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-5">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">AgriValue Connect was founded with a simple but powerful vision: every farmer deserves fair compensation for their hard work and the ability to reach global markets.</p>
              <p className="text-gray-600 leading-relaxed mb-6">We provide farmers with tools to add value to their produce, smart pricing algorithms, and direct connections to international buyers — eliminating middlemen and maximizing farmer income.</p>
              <div className="grid grid-cols-2 gap-4">
                {[['10,000+', 'Farmers Empowered'], ['$2.4M+', 'Farmer Earnings'], ['120+', 'Countries Reached'], ['50,000+', 'Products Listed']].map(([num, label]) => (
                  <div key={label} className="bg-primary-50 rounded-2xl p-4">
                    <p className="text-2xl font-bold text-primary-700">{num}</p>
                    <p className="text-sm text-gray-600">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=80" alt="Farm" className="rounded-3xl shadow-xl w-full h-[400px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Target size={28} />, title: 'Farmer First', desc: 'Every decision we make puts farmer welfare at the center.', color: 'text-primary-600 bg-primary-50' },
              { icon: <Globe size={28} />, title: 'Global Access', desc: 'Breaking barriers to connect local farms with global buyers.', color: 'text-blue-600 bg-blue-50' },
              { icon: <Award size={28} />, title: 'Quality Focus', desc: 'Maintaining the highest standards in every product listed.', color: 'text-amber-600 bg-amber-50' },
              { icon: <Users size={28} />, title: 'Community', desc: 'Building a supportive ecosystem for agricultural growth.', color: 'text-purple-600 bg-purple-50' },
            ].map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card p-6 text-center">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${v.color}`}>{v.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
