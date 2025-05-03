import axiosInstance from "@/config/axiosInstance";
import {
  AUTH_ENDPOINTS,
  GROUP_ENDPOINTS,
  SESSION_ENDPOINTS,
  RESOURCE_ENDPOINTS,
  MOCK_DELAY,
} from "@/config/api-config";

// Toggle this to switch between mock and real API
export const useMockApi = true;

// --- MOCK DATA ---
const mockUser = { id: 1, username: "testuser", email: "test@studybuddy.com" };
const mockSessions = [
  { id: 1, title: "Math Study Group", date: "2025-05-05", group: 1 },
  { id: 2, title: "Physics Q&A", date: "2025-05-06", group: 2 },
];

// --- MOCK API HELPERS ---
function mockResponse(data, delay = MOCK_DELAY) {
  return new Promise((resolve) => setTimeout(() => resolve({ data }), delay));
}

// --- AUTH ---
export async function login({ username, password }) {
  if (useMockApi) {
    if (username === "testuser" && password === "password") {
      return mockResponse({ user: mockUser, token: "mock-token" });
    } else {
      return Promise.reject(new Error("Invalid credentials"));
    }
  }
  return axiosInstance.post(AUTH_ENDPOINTS.LOGIN, { username, password });
}

export async function signup({ username, email, password }) {
  if (useMockApi) {
    return mockResponse({ user: { ...mockUser, username, email }, token: "mock-token" });
  }
  return axiosInstance.post(AUTH_ENDPOINTS.SIGNUP, { username, email, password });
}

// --- SESSIONS ---
export async function fetchSessions() {
  if (useMockApi) {
    return mockResponse(mockSessions);
  }
  return axiosInstance.get(SESSION_ENDPOINTS.LIST);
}

// Add more API functions for groups, chat, resources, etc. following this pattern.