import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useCart } from '../hooks/useCart';

export default function PublicLayout() {
  const { itemCount } = useCart();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemCount={itemCount} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
