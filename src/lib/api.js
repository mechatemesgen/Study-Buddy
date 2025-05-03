import { API_BASE_URL } from "@/config/api-config";

export async function fetchSessions() {
    try {
        const response = await fetch(`${API_BASE_URL}/sessions`); // Use the configured API base URL
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching sessions:', error);
        throw error;
    }
}