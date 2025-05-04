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
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else {
      console.warn("API returned invalid data format for resources, falling back to mock data");
      return mockResources;
    }
  } catch (error) {
    console.error("Failed to fetch resources:", error);
    console.warn("Using mock resource data due to API error");
    return mockResources;
  }
}

/**
 * Fetch current user's resources
 * @returns {Promise<Array>} List of user's resources
 */
export async function fetchMyResources() {
  try {
    const response = await axiosInstance.get(RESOURCE_ENDPOINTS.MY_RESOURCES);
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else {
      console.warn("API returned invalid data format for my resources, falling back to mock data");
      return mockResources;
    }
  } catch (error) {
    console.error("Failed to fetch my resources:", error);
    console.warn("Using mock resource data due to API error");
    return mockResources;
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
    
    // Return mock resource if available
    const mockResource = mockResources.find(resource => resource.id === id || resource.id === Number(id));
    if (mockResource) {
      console.warn(`Using mock data for resource ${id}`);
      return mockResource;
    }
    
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
 * @returns {Promise<Blob>} Resource file as a blob
 */
export async function downloadResource(id) {
  try {
    const response = await axiosInstance.get(RESOURCE_ENDPOINTS.DOWNLOAD(id), {
      responseType: 'blob',
      headers: {
        'Accept': '*/*'
      }
    });
    
    // Get the content type of the file
    const contentType = response.headers['content-type'] || 'application/octet-stream';
    
    // Extract filename from Content-Disposition header if available
    const contentDisposition = response.headers['content-disposition'];
    let filename = `resource-${id}`;
    
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1].replace(/['"]/g, '');
      }
    }
    
    // Create a download link with proper content type
    const blob = new Blob([response.data], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      link.remove();
    }, 100);
    
    return response.data;
  } catch (error) {
    console.error(`Failed to download resource ${id}:`, error);
    
    // For mock data, simulate download by creating a text file
    const mockResource = mockResources.find(r => r.id === id || r.id === Number(id));
    if (mockResource) {
      console.warn(`Using mock download for resource ${id}`);
      
      const textContent = `This is a mock download for: ${mockResource.title}\n\nDescription: ${mockResource.description}`;
      const blob = new Blob([textContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${mockResource.title}.txt`);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        link.remove();
      }, 100);
      
      return blob;
    }
    
    throw new Error("Failed to download resource");
  }
}

/**
 * Fetch resource categories
 * @returns {Promise<Array>} List of resource categories
 */
export async function fetchResourceCategories() {
  try {
    const response = await axiosInstance.get(RESOURCE_ENDPOINTS.CATEGORIES);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch resource categories:", error);
    // Return some default categories as fallback
    console.warn("Using default categories due to API error");
    return [
      { id: 1, name: "Documents" },
      { id: 2, name: "Presentations" },
      { id: 3, name: "Images" },
      { id: 4, name: "Code" },
      { id: 5, name: "Other" },
    ];
  }
}

/**
 * Fetch resources for a specific group
 * @param {string} groupId - Group ID
 * @returns {Promise<Array>} List of group resources
 */
export async function fetchGroupResources(groupId) {
  try {
    const response = await axiosInstance.get(RESOURCE_ENDPOINTS.LIST, {
      params: { group: groupId }
    });
    
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else {
      // Filter mock resources by group ID
      const filteredMockResources = mockResources.filter(
        resource => resource.groupId === groupId || resource.groupId === Number(groupId)
      );
      console.warn(`Using mock data for group ${groupId} resources`);
      return filteredMockResources;
    }
  } catch (error) {
    console.error(`Failed to fetch resources for group ${groupId}:`, error);
    
    // Filter mock resources by group ID as fallback
    const filteredMockResources = mockResources.filter(
      resource => resource.groupId === groupId || resource.groupId === Number(groupId)
    );
    console.warn(`Using mock data for group ${groupId} resources due to API error`);
    return filteredMockResources;
  }
}

/**
 * Toggle favorite status for a resource
 * @param {string} id - Resource ID
 * @returns {Promise<Object>} Updated resource data
 */
export async function toggleFavorite(id) {
  try {
    const response = await axiosInstance.post(RESOURCE_ENDPOINTS.DETAIL(id), {
      toggle_favorite: true
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to toggle favorite for resource ${id}:`, error);
    throw new Error("Failed to update favorite status");
  }
}

/**
 * Share a resource with users or groups
 * @param {string} id - Resource ID
 * @param {Object} shareData - Share data
 * @param {Array<string>} [shareData.users] - User IDs to share with
 * @param {Array<string>} [shareData.groups] - Group IDs to share with
 * @returns {Promise<Object>} Share result
 */
export async function shareResource(id, shareData) {
  try {
    const response = await axiosInstance.post(RESOURCE_ENDPOINTS.DETAIL(id), {
      share: shareData
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to share resource ${id}:`, error);
    throw new Error("Failed to share resource");
  }
}

/**
 * Preview a resource
 * @param {string} id - Resource ID
 * @returns {Promise<Object>} Resource preview data
 */
export async function previewResource(id) {
  try {
    // Using the detail endpoint with a query param for preview
    const response = await axiosInstance.get(`${RESOURCE_ENDPOINTS.DETAIL(id)}?preview=true`);
    return response.data;
  } catch (error) {
    console.error(`Failed to preview resource ${id}:`, error);
    
    // For mock resources, open in a new tab
    const mockResource = mockResources.find(r => r.id === id || r.id === Number(id));
    if (mockResource) {
      console.warn(`Opening mock preview for resource ${id}`);
      alert(`This is a mock preview for: ${mockResource.title}`);
      return mockResource;
    }
    
    throw new Error("Failed to preview resource");
  }
}
