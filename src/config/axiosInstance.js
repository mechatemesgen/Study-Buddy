import axios from "axios";
import { API_BASE_URL, AUTH_ENDPOINTS } from "@/config/api-config";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Adjust if you need cookies/auth
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding the auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

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
