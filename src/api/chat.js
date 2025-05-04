// Mock API service for group chat
// In a real app, this would connect to your Django REST backend

import axiosInstance from "../config/axiosInstance";
import { GROUP_ENDPOINTS } from "../config/api-config";

/**
 * Fetch chat messages for a study group
 * @param {string} groupId - Group ID
 * @returns {Promise<Array>} List of chat messages
 */
export async function fetchGroupChat(groupId) {
  try {
    const response = await axiosInstance.get(GROUP_ENDPOINTS.CHATS.LIST(groupId));
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch chat for group ${groupId}:`, error);
    throw new Error("Failed to fetch group chat messages");
  }
}

/**
 * Send a message to a group chat
 * @param {string} groupId - Group ID
 * @param {string} message - Message text
 * @param {Array<File>} attachments - Optional file attachments
 * @returns {Promise<Object>} The sent message
 */
export async function sendMessage(groupId, message, attachments = []) {
  try {
    // If there are attachments, use FormData
    if (attachments && attachments.length > 0) {
      const formData = new FormData();
      formData.append('message', message);
      
      // Add each attachment
      attachments.forEach((attachment, index) => {
        formData.append(`attachment`, attachment);
      });
      
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
      // Text-only message
      const response = await axiosInstance.post(
        GROUP_ENDPOINTS.CHATS.SEND(groupId),
        { message }
      );
      
      return response.data;
    }
  } catch (error) {
    console.error(`Failed to send message to group ${groupId}:`, error);
    throw new Error("Failed to send message");
  }
}

/**
 * Fetch a specific chat message
 * @param {string} groupId - Group ID
 * @param {string} messageId - Message ID
 * @returns {Promise<Object>} Chat message
 */
export async function fetchMessage(groupId, messageId) {
  try {
    const response = await axiosInstance.get(GROUP_ENDPOINTS.CHATS.DETAIL(groupId, messageId));
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch message ${messageId}:`, error);
    throw new Error("Failed to fetch message");
  }
}

/**
 * Set up WebSockets for real-time chat
 * @param {string} groupId - Group ID
 * @param {Function} onMessage - Callback for incoming messages
 * @returns {Object} WebSocket connection with close method
 */
export function setupChatWebSocket(groupId, onMessage) {
  // Get the access token for authentication
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('Authentication required for chat');
  }
  
  // Create WebSocket connection
  const baseURL = axiosInstance.defaults.baseURL.replace(/^http/, 'ws');
  const ws = new WebSocket(`${baseURL}/ws/chat/${groupId}/?token=${token}`);
  
  ws.onopen = () => {
    console.log('Chat WebSocket connection established');
  };
  
  ws.onmessage = (event) => {
    // Parse the incoming message
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  };
  
  ws.onerror = (error) => {
    console.error('Chat WebSocket error:', error);
  };
  
  ws.onclose = (event) => {
    console.log('Chat WebSocket connection closed:', event.code, event.reason);
  };
  
  // Return the WebSocket with a close method
  return {
    socket: ws,
    close: () => {
      ws.close();
    },
  };
}
