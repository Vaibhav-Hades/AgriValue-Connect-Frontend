import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatsCard({ title, value, change, changeType = 'up', icon: Icon, color = 'primary' }) {
  const colors = {
    primary: 'bg-primary-50 text-primary-600',
    earth: 'bg-earth-50 text-earth-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
  };
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${changeType === 'up' ? 'text-green-600' : 'text-red-500'}`}>
              {changeType === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {change} vs last month
            </div>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${colors[color]}`}>
            <Icon size={22} />
          </div>
        )}
      </div>
    </div>
  );
}
