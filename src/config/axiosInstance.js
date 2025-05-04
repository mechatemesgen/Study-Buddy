import axios from "axios";
import { AUTH_ENDPOINTS } from "./api-config";

// Use Vite's environment variables or fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Needed for cookies
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  // Add timeout to prevent hanging requests
  timeout: 30000, // 30 seconds
});

// Request interceptor for adding the auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Handle file downloads differently
    if (config.url?.includes('/download/')) {
      config.responseType = 'blob';
      config.headers['Accept'] = '*/*';
    }
    
    // Log outgoing requests in development
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config);
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    // Log API responses in development
    if (import.meta.env.DEV) {
      if (response.config.responseType === 'blob') {
        console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, 'Blob data', response.headers);
      } else {
        console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
      }
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Log API errors in development
    if (import.meta.env.DEV) {
      console.error(`[API Error] ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url}`, error.response?.data || error.message);
    }

    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        
        // Request new access token using refresh token
        const response = await axios.post(`${API_BASE_URL}${AUTH_ENDPOINTS.REFRESH_TOKEN}`, {
          refresh: refreshToken,
        });
        
        // Save the new access token
        const { access } = response.data;
        localStorage.setItem('accessToken', access);
        
        // Update the failed request with the new token and retry
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh token is invalid, clear auth data and redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        // If we're not already on the login page, redirect to it
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
export { API_BASE_URL };
