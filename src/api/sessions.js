// Mock API service for study sessions
// In a real app, this would connect to your Django REST backend

import axiosInstance from "../config/axiosInstance";
import { DASHBOARD_ENDPOINTS } from "../config/api-config";

// Simulated delay for API calls
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock session data
const mockSessions = [
  {
    id: "1",
    title: "Calculus Midterm Review",
    start: new Date(new Date().setDate(new Date().getDate() + 1)),
    end: new Date(new Date().setDate(new Date().getDate() + 1) + 2 * 60 * 60 * 1000),
    groupId: "1",
    groupName: "Calculus Study Group",
    description: "Reviewing chapters 1-5 for the midterm exam. We'll focus on integration techniques and applications.",
    agenda: [
      "Review of differentiation rules",
      "Integration techniques",
      "Applications of integration",
      "Practice problems",
    ],
    location: "Library Study Room 3",
    attendees: [
      { id: "1", name: "John Doe", avatar: "", isHost: true },
      { id: "2", name: "Jane Smith", avatar: "", isHost: false },
      { id: "3", name: "Michael Chen", avatar: "", isHost: false },
      { id: "4", name: "Emily Rodriguez", avatar: "", isHost: false },
    ],
    maxAttendees: 8,
    isVirtual: true,
    meetingLink: "https://meet.google.com/abc-defg-hij",
    materials: [
      { id: "1", title: "Calculus Cheat Sheet", type: "pdf" },
      { id: "2", title: "Midterm Practice Problems", type: "docx" },
    ],
    status: "upcoming",
  },
  {
    id: "2",
    title: "Programming Practice",
    start: new Date(new Date().setHours(new Date().getHours() + 1)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
    groupId: "2",
    groupName: "Computer Science 101",
    description: "Solving algorithm problems and coding challenges to prepare for technical interviews.",
    agenda: ["Array manipulation problems", "String algorithms", "Dynamic programming introduction", "Code review"],
    location: "",
    attendees: [
      { id: "1", name: "John Doe", avatar: "", isHost: false },
      { id: "2", name: "Jane Smith", avatar: "", isHost: true },
      { id: "5", name: "David Kim", avatar: "", isHost: false },
      { id: "6", name: "Sarah Williams", avatar: "", isHost: false },
      { id: "7", name: "Alex Johnson", avatar: "", isHost: false },
      { id: "8", name: "Lisa Brown", avatar: "", isHost: false },
    ],
    maxAttendees: 10,
    isVirtual: true,
    meetingLink: "https://zoom.us/j/123456789",
    materials: [
      { id: "3", title: "Algorithm Flowcharts", type: "pptx" },
      { id: "5", title: "JavaScript Basics", type: "js" },
    ],
    status: "upcoming",
  },
  {
    id: "3",
    title: "Integration Techniques",
    start: new Date(new Date().setDate(new Date().getDate() + 3)),
    end: new Date(new Date().setDate(new Date().getDate() + 3) + 1.5 * 60 * 60 * 1000),
    groupId: "1",
    groupName: "Calculus Study Group",
    description: "Focusing on advanced integration techniques including substitution, parts, and partial fractions.",
    agenda: ["U-substitution review", "Integration by parts", "Partial fractions", "Trigonometric substitutions"],
    location: "Math Building Room 203",
    attendees: [
      { id: "1", name: "John Doe", avatar: "", isHost: false },
      { id: "2", name: "Jane Smith", avatar: "", isHost: true },
      { id: "3", name: "Michael Chen", avatar: "", isHost: false },
    ],
    maxAttendees: 6,
    isVirtual: false,
    meetingLink: "",
    materials: [],
    status: "upcoming",
  },
  {
    id: "4",
    title: "Biology Lab Prep",
    start: new Date(new Date().setDate(new Date().getDate() + 5)),
    end: new Date(new Date().setDate(new Date().getDate() + 5) + 2 * 60 * 60 * 1000),
    groupId: "3",
    groupName: "Biology Research Team",
    description: "Preparing for next week's lab experiment on cell cultures.",
    agenda: [
      "Lab safety review",
      "Experimental procedure walkthrough",
      "Data collection methods",
      "Analysis techniques",
    ],
    location: "Science Building Lab 4",
    attendees: [
      { id: "1", name: "John Doe", avatar: "", isHost: true },
      { id: "6", name: "Sarah Williams", avatar: "", isHost: false },
      { id: "7", name: "Alex Johnson", avatar: "", isHost: false },
      { id: "8", name: "Lisa Brown", avatar: "", isHost: false },
    ],
    maxAttendees: 6,
    isVirtual: false,
    meetingLink: "",
    materials: [{ id: "6", title: "Biology Notes Chapter 5", type: "pdf" }],
    status: "upcoming",
  },
  {
    id: "5",
    title: "Past Study Session",
    start: new Date(new Date().setDate(new Date().getDate() - 2)),
    end: new Date(new Date().setDate(new Date().getDate() - 2) + 2 * 60 * 60 * 1000),
    groupId: "1",
    groupName: "Calculus Study Group",
    description: "Review of differentiation rules and applications.",
    agenda: ["Power rule", "Product and quotient rules", "Chain rule", "Applications"],
    location: "Library Study Room 2",
    attendees: [
      { id: "1", name: "John Doe", avatar: "", isHost: true },
      { id: "2", name: "Jane Smith", avatar: "", isHost: false },
      { id: "3", name: "Michael Chen", avatar: "", isHost: false },
    ],
    maxAttendees: 8,
    isVirtual: false,
    meetingLink: "",
    materials: [],
    status: "completed",
    notes:
      "We covered all the differentiation rules and worked through several example problems. Everyone should review the practice problems before the next session.",
  },
]

/**
 * Fetch all study sessions
 * @returns {Promise<Array>} List of study sessions
 */
export async function fetchSessions() {
  try {
    const response = await axiosInstance.get(DASHBOARD_ENDPOINTS.SESSIONS.LIST);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch sessions:", error);
    throw new Error("Failed to fetch study sessions");
  }
}

/**
 * Fetch a specific study session by ID
 * @param {string} id - Session ID
 * @returns {Promise<Object>} Study session details
 */
export async function fetchSession(id) {
  try {
    const response = await axiosInstance.get(DASHBOARD_ENDPOINTS.SESSIONS.DETAIL(id));
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch session ${id}:`, error);
    throw new Error("Failed to fetch session details");
  }
}

/**
 * Create a new study session
 * @param {Object} data - Session data
 * @returns {Promise<Object>} New session data
 */
export async function scheduleSession(data) {
  try {
    const response = await axiosInstance.post(DASHBOARD_ENDPOINTS.SESSIONS.LIST, data);
    return response.data;
  } catch (error) {
    console.error("Failed to schedule session:", error);
    throw new Error(
      error.response?.data?.detail || 
      error.response?.data?.title?.[0] || 
      "Failed to schedule study session"
    );
  }
}

/**
 * Update an existing study session
 * @param {string} id - Session ID
 * @param {Object} data - Updated session data
 * @returns {Promise<Object>} Updated session data
 */
export async function updateSession(id, data) {
  try {
    const response = await axiosInstance.patch(DASHBOARD_ENDPOINTS.SESSIONS.DETAIL(id), data);
    return response.data;
  } catch (error) {
    console.error(`Failed to update session ${id}:`, error);
    throw new Error("Failed to update study session");
  }
}

/**
 * Delete a study session
 * @param {string} id - Session ID
 * @returns {Promise<void>}
 */
export async function deleteSession(id) {
  try {
    await axiosInstance.delete(DASHBOARD_ENDPOINTS.SESSIONS.DETAIL(id));
  } catch (error) {
    console.error(`Failed to delete session ${id}:`, error);
    throw new Error("Failed to delete study session");
  }
}

/**
 * Join a study session
 * @param {string} id - Session ID
 * @returns {Promise<Object>} Updated session data
 */
export async function joinSession(id) {
  try {
    const response = await axiosInstance.post(DASHBOARD_ENDPOINTS.SESSIONS.JOIN(id));
    return response.data;
  } catch (error) {
    console.error(`Failed to join session ${id}:`, error);
    throw new Error("Failed to join study session");
  }
}

/**
 * Leave a study session
 * @param {string} id - Session ID
 * @returns {Promise<Object>} Updated session data
 */
export async function leaveSession(id) {
  try {
    const response = await axiosInstance.post(DASHBOARD_ENDPOINTS.SESSIONS.LEAVE(id));
    return response.data;
  } catch (error) {
    console.error(`Failed to leave session ${id}:`, error);
    throw new Error("Failed to leave study session");
  }
}

/**
 * Fetch sessions for a specific group
 * @param {string} groupId - Group ID
 * @returns {Promise<Array>} List of group's sessions
 */
export async function fetchGroupSessions(groupId) {
  try {
    // Use query parameter to filter sessions by group
    const response = await axiosInstance.get(DASHBOARD_ENDPOINTS.SESSIONS.LIST, {
      params: { group: groupId }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch sessions for group ${groupId}:`, error);
    throw new Error("Failed to fetch group study sessions");
  }
}

export async function addSessionMaterial(sessionId, resourceId) {
  // Simulate API call
  await delay(MOCK_DELAY / 2)

  const session = mockSessions.find((s) => s.id === sessionId)
  if (session) {
    // In a real app, you would fetch the resource details
    // For now, we'll just add a mock resource
    session.materials.push({
      id: resourceId,
      title: `Resource ${resourceId}`,
      type: "pdf",
    })

    return { success: true, session }
  }

  return { success: false, error: "Session not found" }
}
