// Mock API service for resources
// In a real app, this would connect to your Django REST backend

import axiosInstance from "../config/axiosInstance";
import { RESOURCE_ENDPOINTS, DASHBOARD_ENDPOINTS } from "../config/api-config";

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

/**
 * Fetch all resources
 * @returns {Promise<Array>} List of resources
 */
export async function fetchResources() {
  try {
    const response = await axiosInstance.get(RESOURCE_ENDPOINTS.LIST);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch resources:", error);
    throw new Error("Failed to fetch resources");
  }
}

/**
 * Fetch current user's resources
 * @returns {Promise<Array>} List of user's resources
 */
export async function fetchMyResources() {
  try {
    const response = await axiosInstance.get(RESOURCE_ENDPOINTS.MY_RESOURCES);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch my resources:", error);
    throw new Error("Failed to fetch your resources");
  }
}

/**
 * Fetch a specific resource by ID
 * @param {string} id - Resource ID
 * @returns {Promise<Object>} Resource details
 */
export async function fetchResource(id) {
  try {
    const response = await axiosInstance.get(RESOURCE_ENDPOINTS.DETAIL(id));
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch resource ${id}:`, error);
    throw new Error("Failed to fetch resource details");
  }
}

/**
 * Upload a new resource
 * @param {Object} data - Resource data
 * @param {File} data.file - File to upload
 * @param {string} data.title - Resource title
 * @param {string} data.description - Resource description
 * @param {Array<string>} data.tags - Resource tags
 * @param {string} [data.group_id] - Group ID if associated with a group
 * @returns {Promise<Object>} New resource data
 */
export async function uploadResource(data) {
  try {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('title', data.title);
    
    if (data.description) formData.append('description', data.description);
    if (data.group_id) formData.append('group', data.group_id);
    if (data.tags && data.tags.length > 0) {
      data.tags.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
      });
    }
    
    const response = await axiosInstance.post(RESOURCE_ENDPOINTS.CREATE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("Failed to upload resource:", error);
    throw new Error(
      error.response?.data?.detail || 
      error.response?.data?.file?.[0] || 
      "Failed to upload resource"
    );
  }
}

/**
 * Update a resource
 * @param {string} id - Resource ID
 * @param {Object} data - Updated resource data
 * @returns {Promise<Object>} Updated resource data
 */
export async function updateResource(id, data) {
  try {
    const response = await axiosInstance.patch(RESOURCE_ENDPOINTS.UPDATE(id), data);
    return response.data;
  } catch (error) {
    console.error(`Failed to update resource ${id}:`, error);
    throw new Error("Failed to update resource");
  }
}

/**
 * Delete a resource
 * @param {string} id - Resource ID
 * @returns {Promise<void>}
 */
export async function deleteResource(id) {
  try {
    await axiosInstance.delete(RESOURCE_ENDPOINTS.DELETE(id));
  } catch (error) {
    console.error(`Failed to delete resource ${id}:`, error);
    throw new Error("Failed to delete resource");
  }
}

/**
 * Download a resource
 * @param {string} id - Resource ID
 * @returns {Promise<void>} Triggers browser download
 */
export async function downloadResource(id) {
  try {
    // Always use the backend download endpoint
    const token = localStorage.getItem('accessToken');
    const url = RESOURCE_ENDPOINTS.DOWNLOAD(id);
    const response = await axiosInstance.get(url, {
      responseType: 'blob',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    // Try to get filename from Content-Disposition header
    let filename = 'resource';
    const disposition = response.headers['content-disposition'];
    if (disposition && disposition.indexOf('filename=') !== -1) {
      filename = disposition.split('filename=')[1].replace(/"/g, '').trim();
    }
    // Create a blob and trigger download
    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
    return { success: true };
  } catch (error) {
    console.error(`Failed to download resource ${id}:`, error);
    throw new Error("Failed to download resource");
  }
}

/**
 * Fetch all resource categories
 * @returns {Promise<Array>} List of resource categories
 */
export async function fetchResourceCategories() {
  try {
    const response = await axiosInstance.get(RESOURCE_ENDPOINTS.CATEGORIES);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch resource categories:", error);
    throw new Error("Failed to fetch resource categories");
  }
}

/**
 * Fetch resources for a specific group
 * @param {string} groupId - Group ID
 * @returns {Promise<Array>} List of group's resources
 */
export async function fetchGroupResources(groupId) {
  try {
    // Use query parameter to filter resources by group
    const response = await axiosInstance.get(RESOURCE_ENDPOINTS.LIST, {
      params: { group: groupId }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch resources for group ${groupId}:`, error);
    throw new Error("Failed to fetch group resources");
  }
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
