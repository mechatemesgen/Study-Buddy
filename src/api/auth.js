// Mock API service for authentication
// In a real app, this would connect to your Django REST backend

import axiosInstance from "../config/axiosInstance";
import { AUTH_ENDPOINTS } from "../config/api-config";

// Simulated delay for API calls
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock user data
const mockUsers = [
  {
    id: "2",
    name: "Eba Smith",
    email: "ebae@example.com",
    password: "password123",
    avatar: "",
  },
]

/**
 * Log in a user with email and password
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - User's email
 * @param {string} credentials.password - User's password
 * @returns {Promise<Object>} User data and tokens
 */
export async function login(credentials) {
  try {
    // Use the correct login endpoint
    const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, {
      email: credentials.email,
      password: credentials.password,
    });
    // Backend returns: { access, refresh, user }
    let { access, refresh, user } = response.data;
    // Map full_name to name for frontend compatibility
    if (user.full_name) {
      user.name = user.full_name;
      delete user.full_name;
    }
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    localStorage.setItem("user", JSON.stringify(user));
    return { user, token: access };
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error(error.response?.data?.detail || "Invalid credentials");
  }
}

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} New user data and token
 */
export async function signup(userData) {
  try {
    // Use the correct registration endpoint and payload
    const response = await axiosInstance.post(AUTH_ENDPOINTS.SIGNUP, {
      full_name: userData.name,
      email: userData.email,
      password: userData.password,
      confirm_password: userData.confirmPassword,
    });
    // Backend returns: { user, tokens: { access, refresh }, ... }
    let { user, tokens } = response.data;
    // Map full_name to name for frontend compatibility
    if (user.full_name) {
      user.name = user.full_name;
      delete user.full_name;
    }
    localStorage.setItem("accessToken", tokens.access);
    localStorage.setItem("refreshToken", tokens.refresh);
    localStorage.setItem("user", JSON.stringify(user));
    return { user, token: tokens.access };
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error(
      error.response?.data?.detail ||
      error.response?.data?.email?.[0] ||
      error.response?.data?.full_name?.[0] ||
      error.response?.data?.password?.[0] ||
      error.response?.data?.confirm_password?.[0] ||
      "Registration failed"
    );
  }
}

/**
 * Log out the current user
 * @param {boolean} allDevices - If true, log out from all devices
 * @returns {Promise<void>}
 */
export async function logout(allDevices = false) {
  try {
    const endpoint = allDevices ? AUTH_ENDPOINTS.LOGOUT_ALL : AUTH_ENDPOINTS.LOGOUT;
    await axiosInstance.post(endpoint, {
      refresh: localStorage.getItem("refreshToken"),
    });
    
    // Clear local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Logout failed:", error);
    // Clear local storage anyway
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
}

/**
 * Refresh the authentication token
 * @returns {Promise<string>} New access token
 */
export async function refreshToken() {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }
    
    const response = await axiosInstance.post(AUTH_ENDPOINTS.REFRESH_TOKEN, {
      refresh: refreshToken,
    });
    
    const { access } = response.data;
    localStorage.setItem("accessToken", access);
    
    return access;
  } catch (error) {
    console.error("Token refresh failed:", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    throw new Error("Authentication expired. Please log in again.");
  }
}

/**
 * Get the current user's profile
 * @returns {Promise<Object>} User profile data
 */
export async function getProfile() {
  try {
    const response = await axiosInstance.get(AUTH_ENDPOINTS.PROFILE);
    return response.data;
  } catch (error) {
    console.error("Failed to get profile:", error);
    throw new Error("Failed to fetch user profile");
  }
}

/**
 * Update the current user's profile
 * @param {Object} profileData - Updated profile data
 * @returns {Promise<Object>} Updated user profile
 */
export async function updateProfile(profileData) {
  try {
    const response = await axiosInstance.patch(AUTH_ENDPOINTS.PROFILE, profileData);
    return response.data;
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw new Error("Failed to update user profile");
  }
}

/**
 * Request a password reset email
 * @param {string} email - User's email address
 * @returns {Promise<void>}
 */
export async function requestPasswordReset(email) {
  try {
    await axiosInstance.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email });
  } catch (error) {
    console.error("Password reset request failed:", error);
    throw new Error("Failed to request password reset");
  }
}

/**
 * Confirm password reset with token
 * @param {Object} resetData - Password reset data
 * @param {string} resetData.uid - User ID encoded in the reset link
 * @param {string} resetData.token - Reset token from the email
 * @param {string} resetData.password - New password
 * @returns {Promise<void>}
 */
export async function confirmPasswordReset(resetData) {
  try {
    await axiosInstance.post(AUTH_ENDPOINTS.RESET_PASSWORD, {
      uid: resetData.uid,
      token: resetData.token,
      new_password: resetData.password,
      re_new_password: resetData.passwordConfirm,
    });
  } catch (error) {
    console.error("Password reset confirmation failed:", error);
    throw new Error("Failed to reset password");
  }
}
