import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('fixam_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('fixam_token');
      localStorage.removeItem('fixam_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth endpoints
export const authAPI = {
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  register: (data: { name: string; email: string; password: string; role: string }) => api.post('/auth/register', data),
  getProfile: () => api.get('/users/profile'),
};

// Services endpoints
export const servicesAPI = {
  getAll: (params?: Record<string, string>) => api.get('/services', { params }),
  getById: (id: string) => api.get(`/services/${id}`),
  create: (data: any) => api.post('/services', data),
  update: (id: string, data: any) => api.put(`/services/${id}`, data),
  delete: (id: string) => api.delete(`/services/${id}`),
};

// Requests endpoints
export const requestsAPI = {
  getAll: () => api.get('/requests'),
  getById: (id: string) => api.get(`/requests/${id}`),
  create: (data: any) => api.post('/requests', data),
  update: (id: string, data: any) => api.put(`/requests/${id}`, data),
};

// Reviews endpoints
export const reviewsAPI = {
  getByService: (serviceId: string) => api.get(`/reviews/service/${serviceId}`),
  create: (data: any) => api.post('/reviews', data),
};

// Categories endpoints
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  create: (data: any) => api.post('/categories', data),
  update: (id: string, data: any) => api.put(`/categories/${id}`, data),
  delete: (id: string) => api.delete(`/categories/${id}`),
};

// Users (admin)
export const usersAPI = {
  getAll: () => api.get('/users/'),
  update: (id: string, data: any) => api.put(`/users/${id}`, data),
  delete: (id: string) => api.delete(`/users/${id}`),
};
