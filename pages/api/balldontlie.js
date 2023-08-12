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

export async function searchPlayer(playerName) {
    try {
        const name = playerName.split(" ").join("%20")
        const data = await fetchData(`players/?search=${name}`)
        return data;
    } catch (error) {
        console.error('Error searching players:', error);
        throw error;
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

export async function fetchPlayerStats(playerId, season, gamesNum, playoffs) {
    try {
        let allStats = [];
        let currentPage = 1;

        while (currentPage) {
            const data = await fetchData(`stats?seasons[]=${season}&player_ids[]=${[playerId]}&postseason=${playoffs}&page=${currentPage}`)
            allStats.push(...data.data)
            currentPage = data.meta.next_page
        }

        const stats = allStats.slice(-gamesNum)
        return stats;

    } catch (error) {
        console.error('Error fetching stats:', error);
        throw error;
    }
}