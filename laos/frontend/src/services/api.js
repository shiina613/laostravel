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
  updateProfile: (data) => api.put('/user/profile', data),
  changePassword: (data) => api.put('/user/change-password', data),
};

export const categoryService = {
  getAll: () => api.get('/categories'),
};

export const publicService = {
  // Hỗ trợ params object: { keyword, categoryId, province, sortBy, sortDir, page, size }
  getDestinations: (params) => api.get('/destinations', { params }),
  getDestinationBySlug: (slug) => api.get(`/destinations/${slug}`),
  getDestinationProvinces: () => api.get('/destinations/provinces'),
  getFestivals: (params) => api.get('/festivals', { params }),
  getFestivalBySlug: (slug) => api.get(`/festivals/${slug}`),
  // Hỗ trợ params object: { page, size }
  getArticles: (params) => api.get('/articles', { params }),
  getArticleBySlug: (slug) => api.get(`/articles/${slug}`),
};

export const reviewService = {
  getReviews: (targetType, targetId) => api.get(`/reviews/${targetType}/${targetId}`),
  submitReview: (targetType, targetId, data) => api.post(`/reviews/${targetType}/${targetId}`, data),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
};

export const adminService = {
  getDashboard: () => api.get('/admin/dashboard'),
  createDestination: (formData) => api.post('/admin/destinations', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  getAllDestinations: (params) => api.get('/admin/destinations', { params }),
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

  // Festival
  createFestival: (formData) => api.post('/admin/festivals', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getAllFestivals: (params) => api.get('/admin/festivals', { params }),
  getFestivalById: (id) => api.get(`/admin/festivals/${id}`),
  updateFestival: (id, formData) => api.put(`/admin/festivals/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteFestival: (id) => api.delete(`/admin/festivals/${id}`),

  // Article
  createArticle: (formData) => api.post('/admin/articles', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getAllArticles: (params) => api.get('/admin/articles', { params }),
  getArticleById: (id) => api.get(`/admin/articles/${id}`),
  updateArticle: (id, formData) => api.put(`/admin/articles/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteArticle: (id) => api.delete(`/admin/articles/${id}`),

  // Users
  getAllUsers: () => api.get('/admin/users'),
  updateUserStatus: (id, status) => api.put(`/admin/users/${id}/status`, { status }),

  // Reviews
  getAllReviews: (params) => api.get('/admin/reviews', { params }),
  deleteReview: (id) => api.delete(`/admin/reviews/${id}`),

  // Provinces
  getProvinces: () => api.get('/admin/provinces'),
};

export default api;
