import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

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
