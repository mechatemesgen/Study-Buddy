// Mock API service for group chat
// In a real app, this would connect to your Django REST backend

import { MOCK_DELAY } from "@/config/api-config"

// Simulated delay for API calls
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock chat data
const mockChats = {
  1: [
    {
      id: "1",
      groupId: "1",
      userId: "2",
      userName: "Jane Smith",
      userAvatar: "",
      message: "Hey everyone! When are we meeting for the midterm review?",
      timestamp: new Date(new Date().getTime() - 3600000 * 24),
      attachments: [],
    },
    {
      id: "2",
      groupId: "1",
      userId: "1",
      userName: "John Doe",
      userAvatar: "",
      message: "I was thinking tomorrow at 3pm in the library. Does that work for everyone?",
      timestamp: new Date(new Date().getTime() - 3600000 * 23),
      attachments: [],
    },
    {
      id: "3",
      groupId: "1",
      userId: "3",
      userName: "Michael Chen",
      userAvatar: "",
      message: "That works for me. I'll bring my notes from last week's lecture.",
      timestamp: new Date(new Date().getTime() - 3600000 * 22),
      attachments: [],
    },
    {
      id: "4",
      groupId: "1",
      userId: "2",
      userName: "Jane Smith",
      userAvatar: "",
      message: "Perfect! I'll reserve a study room.",
      timestamp: new Date(new Date().getTime() - 3600000 * 21),
      attachments: [],
    },
    {
      id: "5",
      groupId: "1",
      userId: "1",
      userName: "John Doe",
      userAvatar: "",
      message: "I've uploaded some practice problems to the resources section. Let's go through them tomorrow.",
      timestamp: new Date(new Date().getTime() - 3600000 * 20),
      attachments: [
        {
          id: "1",
          name: "Practice Problems.pdf",
          type: "pdf",
          url: "#",
        },
      ],
    },
  ],
  2: [
    {
      id: "1",
      groupId: "2",
      userId: "2",
      userName: "Jane Smith",
      userAvatar: "",
      message: "Has anyone started on the programming assignment yet?",
      timestamp: new Date(new Date().getTime() - 3600000 * 12),
      attachments: [],
    },
    {
      id: "2",
      groupId: "2",
      userId: "1",
      userName: "John Doe",
      userAvatar: "",
      message: "I've just started. The first few problems aren't too bad.",
      timestamp: new Date(new Date().getTime() - 3600000 * 11),
      attachments: [],
    },
    {
      id: "3",
      groupId: "2",
      userId: "4",
      userName: "Emily Rodriguez",
      userAvatar: "",
      message: "I'm stuck on problem 3. Can we discuss it in our next session?",
      timestamp: new Date(new Date().getTime() - 3600000 * 10),
      attachments: [],
    },
    {
      id: "4",
      groupId: "2",
      userId: "1",
      userName: "John Doe",
      userAvatar: "",
      message: "Sure, I can help with that. Let me share my approach.",
      timestamp: new Date(new Date().getTime() - 3600000 * 9),
      attachments: [
        {
          id: "2",
          name: "Problem3Solution.js",
          type: "js",
          url: "#",
        },
      ],
    },
  ],
  3: [
    {
      id: "1",
      groupId: "3",
      userId: "1",
      userName: "John Doe",
      userAvatar: "",
      message: "I found this interesting article on the latest research in our field.",
      timestamp: new Date(new Date().getTime() - 3600000 * 48),
      attachments: [
        {
          id: "3",
          name: "Research Article.pdf",
          type: "pdf",
          url: "#",
        },
      ],
    },
    {
      id: "2",
      groupId: "3",
      userId: "5",
      userName: "Sarah Williams",
      userAvatar: "",
      message: "Thanks for sharing! This will be helpful for our project.",
      timestamp: new Date(new Date().getTime() - 3600000 * 47),
      attachments: [],
    },
  ],
}

// Current user ID (for demo purposes)
const currentUserId = "1"

export async function fetchGroupChat(groupId) {
  // Simulate API call
  await delay(MOCK_DELAY)
  return mockChats[groupId] || []
}

export async function sendMessage(groupId, message, attachments = []) {
  // Simulate API call
  await delay(MOCK_DELAY / 2)

  const newMessage = {
    id: String(Date.now()),
    groupId,
    userId: currentUserId,
    userName: "John Doe", // Current user
    userAvatar: "",
    message,
    timestamp: new Date(),
    attachments: attachments.map((attachment, index) => ({
      id: String(Date.now() + index),
      name: attachment.name,
      type: attachment.name.split(".").pop(),
      url: "#",
    })),
  }

  // Add to mock data
  if (!mockChats[groupId]) {
    mockChats[groupId] = []
  }
  mockChats[groupId].push(newMessage)

  return newMessage
}

export async function deleteMessage(groupId, messageId) {
  // Simulate API call
  await delay(MOCK_DELAY / 2)

  if (mockChats[groupId]) {
    const index = mockChats[groupId].findIndex((msg) => msg.id === messageId)
    if (index !== -1) {
      mockChats[groupId].splice(index, 1)
      return true
    }
  }

  return false
}
