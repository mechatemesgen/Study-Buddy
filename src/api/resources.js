// Mock API service for resources
// In a real app, this would connect to your Django REST backend

import { MOCK_DELAY } from "@/config/api-config"

// Simulated delay for API calls
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock resource data
const mockResources = [
  {
    id: "1",
    title: "Calculus Cheat Sheet",
    type: "pdf",
    uploadedBy: "John Doe",
    uploadedAt: "2 days ago",
    uploadedDate: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000),
    fileSize: "2.4 MB",
    downloadUrl: "#",
    previewUrl: "#",
    description: "A comprehensive cheat sheet covering all major calculus concepts for the midterm.",
    groupId: "1",
    isFavorite: false,
    downloadCount: 12,
    tags: ["calculus", "midterm", "study guide"],
  },
  {
    id: "2",
    title: "Midterm Practice Problems",
    type: "docx",
    uploadedBy: "Jane Smith",
    uploadedAt: "Yesterday",
    uploadedDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
    fileSize: "1.8 MB",
    downloadUrl: "#",
    previewUrl: "#",
    description: "Practice problems for the upcoming midterm exam with solutions.",
    groupId: "1",
    isFavorite: true,
    downloadCount: 8,
    tags: ["practice", "midterm", "problems"],
  },
  {
    id: "3",
    title: "Algorithm Flowcharts",
    type: "pptx",
    uploadedBy: "Jane Smith",
    uploadedAt: "3 days ago",
    uploadedDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
    fileSize: "5.2 MB",
    downloadUrl: "#",
    previewUrl: "#",
    description: "Visual flowcharts explaining common algorithms covered in class.",
    groupId: "2",
    isFavorite: false,
    downloadCount: 15,
    tags: ["algorithms", "flowcharts", "visualization"],
  },
  {
    id: "4",
    title: "Data Structures Diagram",
    type: "png",
    uploadedBy: "John Doe",
    uploadedAt: "Last week",
    uploadedDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
    fileSize: "1.1 MB",
    downloadUrl: "#",
    previewUrl: "#",
    description: "Comprehensive diagram showing relationships between different data structures.",
    groupId: "2",
    isFavorite: true,
    downloadCount: 23,
    tags: ["data structures", "diagram", "computer science"],
  },
  {
    id: "5",
    title: "JavaScript Basics",
    type: "js",
    uploadedBy: "Michael Chen",
    uploadedAt: "4 days ago",
    uploadedDate: new Date(new Date().getTime() - 4 * 24 * 60 * 60 * 1000),
    fileSize: "0.8 MB",
    downloadUrl: "#",
    previewUrl: "#",
    description: "Example code covering JavaScript fundamentals and best practices.",
    groupId: "2",
    isFavorite: false,
    downloadCount: 7,
    tags: ["javascript", "programming", "basics"],
  },
  {
    id: "6",
    title: "Biology Notes Chapter 5",
    type: "pdf",
    uploadedBy: "Sarah Williams",
    uploadedAt: "1 week ago",
    uploadedDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
    fileSize: "3.2 MB",
    downloadUrl: "#",
    previewUrl: "#",
    description: "Detailed notes from Chapter 5 covering cell biology and functions.",
    groupId: "3",
    isFavorite: false,
    downloadCount: 9,
    tags: ["biology", "notes", "cell biology"],
  },
]

export async function fetchResources() {
  // Simulate API call
  await delay(MOCK_DELAY)
  return mockResources
}

export async function fetchGroupResources(groupId) {
  // Simulate API call
  await delay(MOCK_DELAY)
  return mockResources.filter((resource) => resource.groupId === groupId)
}

export async function fetchResource(id) {
  // Simulate API call
  await delay(MOCK_DELAY)
  return mockResources.find((resource) => resource.id === id) || null
}

export async function uploadResource(data) {
  // Simulate API call
  await delay(MOCK_DELAY * 1.5)

  const file = data.files[0]
  const fileExtension = file.name.split(".").pop() || ""

  const newResource = {
    id: String(mockResources.length + 1),
    title: data.title || file.name,
    type: fileExtension,
    uploadedBy: "Current User",
    uploadedAt: "Just now",
    uploadedDate: new Date(),
    fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    downloadUrl: "#",
    previewUrl: "#",
    description: data.description || "",
    groupId: data.groupId,
    isFavorite: false,
    downloadCount: 0,
    tags: data.tags || [],
  }

  mockResources.push(newResource)
  return newResource
}

export async function downloadResource(id) {
  // Simulate API call
  await delay(MOCK_DELAY / 2)

  const resource = mockResources.find((r) => r.id === id)
  if (resource) {
    // Increment download count
    resource.downloadCount += 1

    // In a real app, this would trigger a file download
    // For now, we'll just return success
    return { success: true, resource }
  }

  return { success: false, error: "Resource not found" }
}

export async function toggleFavorite(id) {
  // Simulate API call
  await delay(MOCK_DELAY / 2)

  const resource = mockResources.find((r) => r.id === id)
  if (resource) {
    resource.isFavorite = !resource.isFavorite
    return { success: true, isFavorite: resource.isFavorite }
  }

  return { success: false, error: "Resource not found" }
}

export async function shareResource(id, shareData) {
  // Simulate API call
  await delay(MOCK_DELAY / 2)

  const resource = mockResources.find((r) => r.id === id)
  if (resource) {
    // In a real app, this would share the resource with other users
    // For now, we'll just return success
    return {
      success: true,
      message: `Resource "${resource.title}" shared successfully with ${shareData.recipients.length} users`,
    }
  }

  return { success: false, error: "Resource not found" }
}

export async function previewResource(id) {
  // Simulate API call
  await delay(MOCK_DELAY / 2)

  const resource = mockResources.find((r) => r.id === id)
  if (resource) {
    // In a real app, this would return preview data
    return {
      success: true,
      resource,
      previewData: {
        url: resource.previewUrl,
        type: resource.type,
        canPreview: ["pdf", "png", "jpg", "jpeg", "gif"].includes(resource.type.toLowerCase()),
      },
    }
  }

  return { success: false, error: "Resource not found" }
}
