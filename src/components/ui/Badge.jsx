const badgeStyles = {
  Organic: 'bg-green-100 text-green-700',
  Handmade: 'bg-purple-100 text-purple-700',
  Traditional: 'bg-amber-100 text-amber-700',
  'Eco-Friendly': 'bg-teal-100 text-teal-700',
  Verified: 'bg-blue-100 text-blue-700',
  New: 'bg-pink-100 text-pink-700',
};

export default function Badge({ label, className = '' }) {
  return (
    <span className={`badge ${badgeStyles[label] || 'bg-gray-100 text-gray-600'} ${className}`}>
      {label}
    </span>
  );
}
