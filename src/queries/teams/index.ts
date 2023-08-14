import { useQuery, useQueryClient } from "react-query";
import { Team } from "../../types/teams";
import { apiEndpoints } from "../../constants/apiEndpoints";
import { queryCacheTime } from "../../constants/settings";

export function useTeams() {
    return useQuery(`teams`, async () => {
        const response = await fetch(apiEndpoints.Teams)
        const data = await response.json()
        const teams = data.items as Team[]
        return teams
    }, { cacheTime: queryCacheTime, staleTime: queryCacheTime  });
}

export function useTeam(id: string) {
    return useQuery(`team-${id}`, async () => {
        const response = await fetch(`${apiEndpoints.Teams}/${id}`)
        const data = await response.json()
        const team = data as Team
        return team
    }, { cacheTime: queryCacheTime, staleTime: queryCacheTime  });
}

export const editTeamBotMode = async (id: string, botMode: boolean): Promise<boolean> => {
    const results = await fetch(`${apiEndpoints.Teams}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ auto_formation: botMode })
    })
    return results.ok
}

  