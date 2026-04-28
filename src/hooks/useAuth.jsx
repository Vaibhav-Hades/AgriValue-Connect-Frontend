import { createContext, useContext, useState } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

// Extract a readable error message from any backend error response shape
function extractError(err) {
  const data = err.response?.data;
  if (!data) return 'Network error. Is the backend running?';
  // Validation errors come as { details: { field: message, ... } }
  if (data.details && typeof data.details === 'object') {
    return Object.values(data.details).join(', ');
  }
  // Standard errors come as { message: '...' }
  if (data.message) return data.message;
  // Fallback
  return 'Something went wrong. Please try again.';
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('agrivalue_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  // Login — POST /api/auth/login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await authAPI.login({ email, password });
      // backend returns role as "FARMER" / "BUYER" / "ADMIN" — lowercase for routing
      const userData = {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role.toLowerCase(),
      };
      setUser(userData);
      localStorage.setItem('agrivalue_user', JSON.stringify(userData));
      localStorage.setItem('agrivalue_token', data.token);
      return { success: true, user: userData };
    } catch (err) {
      return { success: false, error: extractError(err) };
    } finally {
      setLoading(false);
    }
  };

  // Register — POST /api/auth/register
  const register = async (formData) => {
    setLoading(true);
    try {
      // Backend DTO expects: name, email, password, role (uppercase), village, phone, specialty
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role.toUpperCase(),       // FARMER | BUYER | ADMIN
        phone: formData.phone || null,
        village: formData.village || null,
        specialty: formData.specialty || null,
      };
      const { data } = await authAPI.register(payload);
      const userData = {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role.toLowerCase(),
      };
      setUser(userData);
      localStorage.setItem('agrivalue_user', JSON.stringify(userData));
      localStorage.setItem('agrivalue_token', data.token);
      return { success: true, user: userData };
    } catch (err) {
      return { success: false, error: extractError(err) };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agrivalue_user');
    localStorage.removeItem('agrivalue_token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
