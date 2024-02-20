import axios from 'axios';

const API_URL = 'https://api.potterdb.com';

export async function getCharacters() {
    try {
        const response = await axios.get(`${API_URL}/characters`);
        return response.data;
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
}
