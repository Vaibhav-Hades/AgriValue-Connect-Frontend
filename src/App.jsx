import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute, GuestRoute } from './routes/ProtectedRoute';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import AboutPage from './pages/public/AboutPage';
import ExploreProducts from './pages/public/ExploreProducts';
import ProductDetails from './pages/public/ProductDetails';
import FarmersDirectory from './pages/public/FarmersDirectory';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Farmer Pages
import FarmerDashboard from './pages/farmer/FarmerDashboard';
import AddProduct from './pages/farmer/AddProduct';
import ManageProducts from './pages/farmer/ManageProducts';
import Inventory from './pages/farmer/Inventory';
import FarmerOrders from './pages/farmer/FarmerOrders';
import Messages from './pages/farmer/Messages';
import ValueAddition from './pages/farmer/ValueAddition';
import SmartPricing from './pages/farmer/SmartPricing';
import FarmerProfile from './pages/farmer/FarmerProfile';

// Buyer Pages
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import CartPage from './pages/buyer/CartPage';
import Wishlist from './pages/buyer/Wishlist';
import BuyerOrders from './pages/buyer/BuyerOrders';
import BulkRequest from './pages/buyer/BulkRequest';
import BuyerProfile from './pages/buyer/BuyerProfile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import ReviewsComplaints from './pages/admin/ReviewsComplaints';
import Analytics from './pages/admin/Analytics';

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{ duration: 3000, style: { borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px' } }} />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ExploreProducts />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/farmers" element={<FarmersDirectory />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />

        {/* Farmer Dashboard */}
        <Route path="/farmer" element={<ProtectedRoute allowedRoles={['farmer']}><DashboardLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<FarmerDashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="orders" element={<FarmerOrders />} />
          <Route path="messages" element={<Messages />} />
          <Route path="value-addition" element={<ValueAddition />} />
          <Route path="pricing" element={<SmartPricing />} />
          <Route path="profile" element={<FarmerProfile />} />
        </Route>

        {/* Buyer Dashboard */}
        <Route path="/buyer" element={<ProtectedRoute allowedRoles={['buyer']}><DashboardLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<BuyerDashboard />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="orders" element={<BuyerOrders />} />
          <Route path="bulk-request" element={<BulkRequest />} />
          <Route path="profile" element={<BuyerProfile />} />
        </Route>

        {/* Admin Dashboard */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><DashboardLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="reviews" element={<ReviewsComplaints />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        {/* Fallback */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}
