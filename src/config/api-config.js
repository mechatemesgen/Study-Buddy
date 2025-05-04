/**
 * API Configuration for React + Vite
 *
 * This file contains all API endpoints and configuration settings.
 * It uses import.meta.env to access environment variables (Vite-style).
 */

// Base API URL - change this in .env as: VITE_API_URL=https://your-api.com
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// Authentication endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login/",
  SIGNUP: "/auth/register/",
  LOGOUT: "/auth/logout/",
  LOGOUT_ALL: "/auth/logout/all/",
  TOKEN: "/auth/token/",
  REFRESH_TOKEN: "/auth/token/refresh/",
  VERIFY_TOKEN: "/auth/token/verify/",
  FORGOT_PASSWORD: "/auth/password-reset/",
  RESET_PASSWORD: "/auth/password-reset/confirm/",
  PROFILE: "/auth/profile/",
  PROFILE_BY_ID: (user_id) => `/auth/profile/${user_id}/`,
  SETTINGS: "/auth/settings/",
};

// Dashboard endpoints
export const DASHBOARD_ENDPOINTS = {
  ACTIVITIES: {
    LIST: "/dashboard/a/activities/",
    DETAIL: (id) => `/dashboard/a/activities/${id}/`,
  },
  GROUPS: {
    LIST: "/dashboard/a/groups/",
    DETAIL: (id) => `/dashboard/a/groups/${id}/`,
  },
  RESOURCES: {
    LIST: "/dashboard/a/resources/",
    DETAIL: (id) => `/dashboard/a/resources/${id}/`,
  },
  SESSIONS: {
    LIST: "/dashboard/a/sessions/",
    DETAIL: (id) => `/dashboard/a/sessions/${id}/`,
    JOIN: (id) => `/dashboard/a/sessions/${id}/join/`,
    LEAVE: (id) => `/dashboard/a/sessions/${id}/leave/`,
  },
};

// Group endpoints
export const GROUP_ENDPOINTS = {
  LIST: "/studygroup/groups/",
  MY_GROUPS: "/studygroup/groups/my/",
  DETAIL: (id) => `/studygroup/groups/${id}/`,
  CREATE: "/studygroup/groups/",
  UPDATE: (id) => `/studygroup/groups/${id}/`,
  DELETE: (id) => `/studygroup/groups/${id}/`,
  SUBJECTS: "/studygroup/subjects/",
  CHATS: {
    LIST: (group_id) => `/studygroup/groups/${group_id}/chats/`,
    SEND: (group_id) => `/studygroup/groups/${group_id}/chats/`,
    DETAIL: (group_id, id) => `/studygroup/groups/${group_id}/chats/${id}/`,
  },
};

// Resource endpoints
export const RESOURCE_ENDPOINTS = {
  LIST: "/resources/resources/",
  MY_RESOURCES: "/resources/resources/my/",
  DETAIL: (id) => `/resources/resources/${id}/`,
  CREATE: "/resources/resources/",
  UPDATE: (id) => `/resources/resources/${id}/`,
  DELETE: (id) => `/resources/resources/${id}/`,
  DOWNLOAD: (id) => `/resources/resources/${id}/download/`,
  CATEGORIES: "/resources/categories/",
};

// File upload configuration
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: {
    DOCUMENTS: [".pdf", ".doc", ".docx", ".txt"],
    PRESENTATIONS: [".ppt", ".pptx"],
    IMAGES: [".jpg", ".jpeg", ".png", ".gif"],
    CODE: [".js", ".html", ".css", ".py", ".java"],
  },
};

// Default pagination settings
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
};

// Mock API delay (ms)
export const MOCK_DELAY = 800;
