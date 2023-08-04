const BASE_URL = "https://www.balldontlie.io/api/v1/"

export async function fetchData(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`)
        if (!response.ok) {
            throw new Error("The api returned an error")
        }
        return await response.json()
    } catch (error) {
        console.error("Error fetching data", error)
    }
}

export async function fetchTeams() {
    try {
        const data = await fetchData('teams');
        return data;
    } catch (error) {
        console.error('Error fetching players:', error);
        throw error;
    }
}