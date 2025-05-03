import axios from "axios";
import { API_BASE_URL } from "@/config/api-config";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Adjust if you need cookies/auth
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
