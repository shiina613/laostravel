import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';
export const BACKEND_URL = 'http://localhost:8080';

// Resolve image URL: nếu path bắt đầu bằng /uploads thì prepend backend URL
export const imgUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${BACKEND_URL}${path}`;
};

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const userService = {
  getProfile: () => api.get('/user/profile'),
};

export const categoryService = {
  getAll: () => api.get('/categories'),
};

export const publicService = {
  getDestinations: (limit = 100) => api.get(`/destinations?limit=${limit}`),
  getDestinationBySlug: (slug) => api.get(`/destinations/${slug}`),
  getFestivals: (limit = 6) => api.get(`/festivals?limit=${limit}`),
  getArticles: (limit = 3) => api.get(`/articles?limit=${limit}`),
};

export const adminService = {
  getDashboard: () => api.get('/admin/dashboard'),
  createDestination: (formData) => api.post('/admin/destinations', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  getAllDestinations: () => api.get('/admin/destinations'),
  getDestinationById: (id) => api.get(`/admin/destinations/${id}`),
  updateDestination: (id, formData) => api.put(`/admin/destinations/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  deleteDestination: (id) => api.delete(`/admin/destinations/${id}`),
  getCategories: () => api.get('/admin/destinations/categories'),
  createCategory: (data) => api.post('/admin/categories', data),
  getAllCategories: () => api.get('/admin/categories'),
  getCategoryById: (id) => api.get(`/admin/categories/${id}`),
  updateCategory: (id, data) => api.put(`/admin/categories/${id}`, data),
  deleteCategory: (id) => api.delete(`/admin/categories/${id}`),
};

export default api;
