const baseUrl = "http://45.32.153.85:8084/api/collections";

export const apiEndpoints = {
    Characters: 'https://rickandmortyapi.com/api/character/?page=:pageId',
    Character: 'https://rickandmortyapi.com/api/character/:id',
    Episodes: 'https://rickandmortyapi.com/api/episode/:ids',
    Players: `${baseUrl}/players_stats/records`,
    Calendar: `${baseUrl}/calendar/records`,
    Teams: `${baseUrl}/teams/records`,
};