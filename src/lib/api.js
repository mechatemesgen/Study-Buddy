export async function fetchSessions() {
    try {
        const response = await fetch('https://your-real-api-endpoint.com/sessions'); // Replace with your actual API endpoint
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