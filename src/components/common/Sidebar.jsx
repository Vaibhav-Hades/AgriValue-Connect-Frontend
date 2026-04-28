import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Leaf, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const farmerLinks = [
  { to: '/farmer/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/farmer/products', icon: '📦', label: 'My Products' },
  { to: '/farmer/add-product', icon: '➕', label: 'Add Product' },
  { to: '/farmer/inventory', icon: '🏪', label: 'Inventory' },
  { to: '/farmer/orders', icon: '🛒', label: 'Orders' },
  { to: '/farmer/messages', icon: '💬', label: 'Messages' },
  { to: '/farmer/value-addition', icon: '💡', label: 'Value Addition' },
  { to: '/farmer/pricing', icon: '🧮', label: 'Smart Pricing' },
  { to: '/farmer/profile', icon: '👤', label: 'Profile' },
];

const buyerLinks = [
  { to: '/buyer/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/products', icon: '🛍️', label: 'Browse Products' },
  { to: '/buyer/cart', icon: '🛒', label: 'My Cart' },
  { to: '/buyer/wishlist', icon: '❤️', label: 'Wishlist' },
  { to: '/buyer/orders', icon: '📋', label: 'My Orders' },
  { to: '/buyer/bulk-request', icon: '📦', label: 'Bulk Request' },
  { to: '/buyer/profile', icon: '👤', label: 'Profile' },
];

const adminLinks = [
  { to: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/admin/users', icon: '👥', label: 'Manage Users' },
  { to: '/admin/products', icon: '📦', label: 'Products' },
  { to: '/admin/orders', icon: '🛒', label: 'Orders' },
  { to: '/admin/reviews', icon: '⭐', label: 'Reviews' },
  { to: '/admin/analytics', icon: '📈', label: 'Analytics' },
];

const roleLinks = { farmer: farmerLinks, buyer: buyerLinks, admin: adminLinks };

export default function Sidebar({ onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = roleLinks[user?.role] || [];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <Leaf size={16} className="text-white" />
          </div>
          <span className="font-bold text-gray-900 text-sm">AgriValue</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 lg:hidden">
            <X size={18} />
          </button>
        )}
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-50">
        <div className="flex items-center gap-3">
          <img
            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=16a34a&color=fff`}
            alt={user?.name}
            className="w-10 h-10 rounded-xl object-cover"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto scrollbar-hide">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onClose}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <span className="text-base">{link.icon}</span>
            <span className="text-sm">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-medium text-sm"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </div>
  );
}
