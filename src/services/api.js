
import axios from 'axios';

// Base URLs
const BASE_URL = 'http://localhost:8080/api'; // This would be your Spring Boot API URL

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include the JWT token for authenticated requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

// Appointment Services
export const appointmentService = {
  createAppointment: (appointmentData) => api.post('/appointments', appointmentData),
  getAppointments: () => api.get('/appointments'),
  updateAppointmentStatus: (id, status) => api.put(`/appointments/${id}`, { status }),
};

// Health Record Services
export const recordService = {
  uploadRecord: (formData) => api.post('/records', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  getRecords: () => api.get('/records'),
};

// Doctor Services
export const doctorService = {
  getAllDoctors: () => api.get('/doctors'),
  getDoctorById: (id) => api.get(`/doctors/${id}`),
};

export default api;
