import { createContext, useContext, useState } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

// Extract a readable error message from any backend error response shape
function extractError(err) {
  const data = err.response?.data;
  const status = err.response?.status;

  // Network error — backend URL might be wrong or backend is down
  if (!err.response) {
    console.error('[Auth Network Error]', err.message);
    return 'Cannot connect to backend. Check your internet connection or backend URL configuration.';
  }

  // Handle different HTTP status codes
  if (status === 400) {
    // Bad request with validation errors
    if (data?.details && typeof data.details === 'object') {
      const errors = Object.entries(data.details)
        .map(([field, msg]) => `${field}: ${msg}`)
        .join(', ');
      return errors;
    }
    return data?.message || 'Invalid request data';
  }

  if (status === 401) {
    return 'Invalid email or password';
  }

  if (status === 403) {
    return 'You do not have permission to access this resource';
  }

  if (status === 409) {
    return data?.message || 'Email already registered';
  }

  if (status >= 500) {
    return 'Backend server error. Please try again later.';
  }

  // Standard error message from backend
  if (data?.message) {
    return data.message;
  }

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
      console.log('[Auth] Logging in user:', email);
      const { data } = await authAPI.login({ email, password });
      console.log('[Auth] Login successful:', data);
      
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
      const errorMsg = extractError(err);
      console.error('[Auth] Login failed:', errorMsg);
      return { success: false, error: errorMsg };
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
      console.log('[Auth] Registering user:', { name: payload.name, email: payload.email, role: payload.role });
      
      const { data } = await authAPI.register(payload);
      console.log('[Auth] Registration successful:', data);
      
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
      const errorMsg = extractError(err);
      console.error('[Auth] Registration failed:', errorMsg);
      return { success: false, error: errorMsg };
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
