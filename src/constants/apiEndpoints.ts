const pbBaseUrl = import.meta.env.VITE_PB_BASE_URL + '/api/collections'
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export const apiEndpoints = {
    Players: `${pbBaseUrl}/players_stats/records`,
    Calendar: `${pbBaseUrl}/calendar/records`,
    Teams: `${pbBaseUrl}/teams/records`,
    Articles: `${pbBaseUrl}/articles/records`,
    Purchases: `${pbBaseUrl}/purchases/records`,
    Schedules: `${pbBaseUrl}/schedules/records`,
    TeamPlayers: `${pbBaseUrl}/team_players/records`,
    EditFormation: `${apiBaseUrl}/update_match_formation`,
    EditAutoFormation: `${apiBaseUrl}/update_team_autoformation`,
};