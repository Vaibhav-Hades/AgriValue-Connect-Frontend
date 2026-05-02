import axios from 'axios';

// Base Axios instance — all requests go through here
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('agrivalue_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle responses globally — log errors and redirect on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error details for debugging
    console.error('[API Error]', {
      status: error.response?.status,
      message: error.response?.data?.message,
      details: error.response?.data?.details,
      url: error.config?.url,
      method: error.config?.method,
    });

    // Handle 401 Unauthorized — redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('agrivalue_token');
      localStorage.removeItem('agrivalue_user');
      window.location.href = '/login';
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('[Access Denied]', 'User does not have permission for this resource');
    }

    // Handle 500 Server Error
    if (error.response?.status >= 500) {
      console.error('[Server Error]', 'Backend server encountered an error');
    }

    // Handle network error
    if (!error.response) {
      console.error('[Network Error]', 'Failed to connect to backend. Check your internet or backend URL.');
    }

    return Promise.reject(error);
  }
);

// ─── AUTH ────────────────────────────────────────────────
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
};

// ─── PRODUCTS ────────────────────────────────────────────
export const productAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  search: (keyword) => api.get(`/products/search?keyword=${keyword}`),
  getByCategory: (category) => api.get(`/products/category/${category}`),
  getMyProducts: () => api.get('/products/my'),           // farmer only
  add: (data) => api.post('/products', data),             // farmer only
  update: (id, data) => api.put(`/products/${id}`, data), // farmer only
  delete: (id) => api.delete(`/products/${id}`),          // farmer/admin
  updateStock: (id, stock) => api.patch(`/products/${id}/stock?stock=${stock}`), // farmer
};

// ─── ORDERS ──────────────────────────────────────────────
export const orderAPI = {
  place: (data) => api.post('/orders', data),             // buyer only
  getMyOrders: () => api.get('/orders/my'),               // buyer only
  getFarmerOrders: () => api.get('/orders/farmer'),       // farmer only
  getAll: () => api.get('/orders'),                       // admin only
  updateStatus: (id, status) => api.put(`/orders/${id}/status?status=${status}`),
};

// ─── REVIEWS ─────────────────────────────────────────────
export const reviewAPI = {
  add: (data) => api.post('/reviews', data),              // buyer only
  getByProduct: (productId) => api.get(`/reviews/product/${productId}`),
  getAll: () => api.get('/reviews'),                      // admin only
  delete: (id) => api.delete(`/reviews/${id}`),           // admin only
};

// ─── INQUIRIES ───────────────────────────────────────────
export const inquiryAPI = {
  submit: (data) => api.post('/inquiries', data),         // buyer only
  getMine: () => api.get('/inquiries/my'),                // buyer only
  getAll: () => api.get('/inquiries'),                    // admin only
  updateStatus: (id, status) => api.put(`/inquiries/${id}/status?status=${status}`),
};

// ─── USERS (ADMIN) ───────────────────────────────────────
export const userAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  getByRole: (role) => api.get(`/users/role/${role}`),
  delete: (id) => api.delete(`/users/${id}`),
  getAnalytics: () => api.get('/users/analytics'),
};

export default api;
