const BASE_URL = "https://nba-stats-db.herokuapp.com/api/"

async function fetchData(endpoint) {
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

async function getRandomPlayer() {
    const endpoint = 'https://nba-stats-db.herokuapp.com/api/playerdata/season/2023/';
    const allPlayers = await fetchAllPages(endpoint);

    if (allPlayers.length === 0) {
        console.error('No players found in the API.');
        return null;
    }

    const randomIndex = Math.floor(Math.random() * allPlayers.length);
    return allPlayers[randomIndex];
}

async function fetchAllPages(endpoint) {
    const allData = [];

    try {
        while (endpoint) {
            const response = await fetch(endpoint);
            const data = await response.json();
            allData.push(...data.results);
            endpoint = data.next;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    return allData;
}

module.exports={
    fetchData,
    getRandomPlayer
}