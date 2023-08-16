const baseUrl = import.meta.env.VITE_BASE_URL + '/api/collections'

export const apiEndpoints = {
    Players: `${baseUrl}/players_stats/records`,
    Calendar: `${baseUrl}/calendar/records`,
    Teams: `${baseUrl}/teams/records`,
    Articles: `${baseUrl}/articles/records`,
    Purchases: `${baseUrl}/purchases/records`,
    Schedules: `${baseUrl}/schedules/records`,
};