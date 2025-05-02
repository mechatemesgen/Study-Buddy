/**
 * API Configuration
 *
 * This file contains all API endpoints and configuration settings.
 * Modify this file to point to your actual backend endpoints when ready.
 */

// Base API URL - change this to your actual backend URL when deploying
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.studybuddy.example.com"

// Authentication endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  LOGOUT: "/auth/logout",
  REFRESH_TOKEN: "/auth/refresh-token",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
}

// User endpoints
export const USER_ENDPOINTS = {
  PROFILE: "/users/profile",
  UPDATE_PROFILE: "/users/profile",
  CHANGE_PASSWORD: "/users/change-password",
  NOTIFICATIONS: "/users/notifications",
  MARK_NOTIFICATION_READ: (id) => `/users/notifications/${id}/read`,
  MARK_ALL_NOTIFICATIONS_READ: "/users/notifications/read-all",
}

// Group endpoints
export const GROUP_ENDPOINTS = {
  LIST: "/groups",
  DETAIL: (id) => `/groups/${id}`,
  CREATE: "/groups",
  UPDATE: (id) => `/groups/${id}`,
  DELETE: (id) => `/groups/${id}`,
  JOIN: (id) => `/groups/${id}/join`,
  LEAVE: (id) => `/groups/${id}/leave`,
  MEMBERS: (id) => `/groups/${id}/members`,
  INVITE: (id) => `/groups/${id}/invite`,
  CHAT: {
    MESSAGES: (id) => `/groups/${id}/messages`,
    SEND: (id) => `/groups/${id}/messages`,
    READ: (id, messageId) => `/groups/${id}/messages/${messageId}/read`,
  },
}

// Session endpoints
export const SESSION_ENDPOINTS = {
  LIST: "/sessions",
  DETAIL: (id) => `/sessions/${id}`,
  CREATE: "/sessions",
  UPDATE: (id) => `/sessions/${id}`,
  DELETE: (id) => `/sessions/${id}`,
  JOIN: (id) => `/sessions/${id}/join`,
  LEAVE: (id) => `/sessions/${id}/leave`,
  GROUP_SESSIONS: (groupId) => `/groups/${groupId}/sessions`,
}

// Resource endpoints
export const RESOURCE_ENDPOINTS = {
  LIST: "/resources",
  DETAIL: (id) => `/resources/${id}`,
  UPLOAD: "/resources",
  UPDATE: (id) => `/resources/${id}`,
  DELETE: (id) => `/resources/${id}`,
  DOWNLOAD: (id) => `/resources/${id}/download`,
  PREVIEW: (id) => `/resources/${id}/preview`,
  SHARE: (id) => `/resources/${id}/share`,
  FAVORITE: (id) => `/resources/${id}/favorite`,
  GROUP_RESOURCES: (groupId) => `/groups/${groupId}/resources`,
}

// WebSocket endpoints
export const WEBSOCKET_ENDPOINTS = {
  CHAT: (groupId) => `/ws/chat/${groupId}`,
  NOTIFICATIONS: "/ws/notifications",
}

// Mock data delay (for development only)
export const MOCK_DELAY = 800

// File upload configuration
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: {
    DOCUMENTS: [".pdf", ".doc", ".docx", ".txt"],
    PRESENTATIONS: [".ppt", ".pptx"],
    IMAGES: [".jpg", ".jpeg", ".png", ".gif"],
    CODE: [".js", ".html", ".css", ".py", ".java"],
  },
}

// Default pagination settings
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
}
