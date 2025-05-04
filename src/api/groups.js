// Mock API service for groups
// In a real app, this would connect to your Django REST backend

// Simulated delay for API calls
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock group data
const mockGroups = [
  {
    id: "1",
    name: "Calculus Study Group",
    description: "A group for studying calculus and preparing for exams",
    subject: "Mathematics",
    avatar: "",
    memberCount: 5,
    isNew: false,
    lastActivity: "2 hours ago",
    members: [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        joinedAt: new Date("2023-01-15"),
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "member",
        joinedAt: new Date("2023-01-20"),
      },
    ],
    createdAt: new Date("2023-01-15"),
  },
  {
    id: "2",
    name: "Computer Science 101",
    description: "Group for CS fundamentals and programming practice",
    subject: "Computer Science",
    avatar: "",
    memberCount: 8,
    isNew: true,
    lastActivity: "Just now",
    members: [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "member",
        joinedAt: new Date("2023-02-10"),
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "admin",
        joinedAt: new Date("2023-02-05"),
      },
    ],
    createdAt: new Date("2023-02-05"),
  },
  {
    id: "3",
    name: "Biology Research Team",
    description: "Collaborative group for biology research projects",
    subject: "Biology",
    avatar: "",
    memberCount: 4,
    isNew: false,
    lastActivity: "Yesterday",
    members: [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "member",
        joinedAt: new Date("2023-03-15"),
      },
    ],
    createdAt: new Date("2023-03-10"),
  },
]

import axiosInstance from "../config/axiosInstance";
import { GROUP_ENDPOINTS } from "../config/api-config";

/**
 * Fetch all study groups
 * @returns {Promise<Array>} List of study groups
 */
export async function fetchGroups() {
  try {
    const response = await axiosInstance.get(GROUP_ENDPOINTS.LIST);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch groups:", error);
    throw new Error("Failed to fetch study groups");
  }
}

/**
 * Fetch the current user's study groups
 * @returns {Promise<Array>} List of user's study groups
 */
export async function fetchMyGroups() {
  try {
    const response = await axiosInstance.get(GROUP_ENDPOINTS.MY_GROUPS);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch my groups:", error);
    throw new Error("Failed to fetch your study groups");
  }
}

/**
 * Fetch a specific study group by ID
 * @param {string} id - Group ID
 * @returns {Promise<Object>} Study group details
 */
export async function fetchGroup(id) {
  try {
    const response = await axiosInstance.get(GROUP_ENDPOINTS.DETAIL(id));
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch group ${id}:`, error);
    throw new Error("Failed to fetch study group details");
  }
}

/**
 * Create a new study group
 * @param {Object} data - Group data
 * @returns {Promise<Object>} New group data
 */
export async function createGroup(data) {
  try {
    const response = await axiosInstance.post(GROUP_ENDPOINTS.CREATE, data);
    return response.data;
  } catch (error) {
    console.error("Failed to create group:", error);
    throw new Error(
      error.response?.data?.detail || 
      error.response?.data?.name?.[0] || 
      "Failed to create study group"
    );
  }
}

/**
 * Update an existing study group
 * @param {string} id - Group ID
 * @param {Object} data - Updated group data
 * @returns {Promise<Object>} Updated group data
 */
export async function updateGroup(id, data) {
  try {
    const response = await axiosInstance.patch(GROUP_ENDPOINTS.UPDATE(id), data);
    return response.data;
  } catch (error) {
    console.error(`Failed to update group ${id}:`, error);
    throw new Error("Failed to update study group");
  }
}

/**
 * Delete a study group
 * @param {string} id - Group ID
 * @returns {Promise<void>}
 */
export async function deleteGroup(id) {
  try {
    await axiosInstance.delete(GROUP_ENDPOINTS.DELETE(id));
  } catch (error) {
    console.error(`Failed to delete group ${id}:`, error);
    throw new Error("Failed to delete study group");
  }
}

/**
 * Fetch all available subjects
 * @returns {Promise<Array>} List of subjects
 */
export async function fetchSubjects() {
  try {
    const response = await axiosInstance.get(GROUP_ENDPOINTS.SUBJECTS);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch subjects:", error);
    throw new Error("Failed to fetch subjects");
  }
}

/**
 * Fetch chat messages for a group
 * @param {string} groupId - Group ID
 * @returns {Promise<Array>} List of chat messages
 */
export async function fetchGroupChats(groupId) {
  try {
    const response = await axiosInstance.get(GROUP_ENDPOINTS.CHATS.LIST(groupId));
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch chats for group ${groupId}:`, error);
    throw new Error("Failed to fetch group chat messages");
  }
}

/**
 * Send a message to a group chat
 * @param {string} groupId - Group ID
 * @param {Object} messageData - Message data
 * @param {string} messageData.message - Message content
 * @param {File} [messageData.attachment] - Optional file attachment
 * @returns {Promise<Object>} New message data
 */
export async function sendGroupChatMessage(groupId, messageData) {
  try {
    // If there's an attachment, use FormData
    if (messageData.attachment) {
      const formData = new FormData();
      formData.append('message', messageData.message);
      formData.append('attachment', messageData.attachment);
      
      const response = await axiosInstance.post(
        GROUP_ENDPOINTS.CHATS.SEND(groupId),
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } else {
      // Regular JSON request for text-only messages
      const response = await axiosInstance.post(
        GROUP_ENDPOINTS.CHATS.SEND(groupId),
        { message: messageData.message }
      );
      return response.data;
    }
  } catch (error) {
    console.error(`Failed to send chat message to group ${groupId}:`, error);
    throw new Error("Failed to send message");
  }
}

/**
 * Fetch a specific chat message
 * @param {string} groupId - Group ID
 * @param {string} messageId - Message ID
 * @returns {Promise<Object>} Chat message details
 */
export async function fetchGroupChatMessage(groupId, messageId) {
  try {
    const response = await axiosInstance.get(GROUP_ENDPOINTS.CHATS.DETAIL(groupId, messageId));
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch chat message ${messageId}:`, error);
    throw new Error("Failed to fetch message details");
  }
}
