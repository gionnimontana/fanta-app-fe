import { useQuery } from "react-query";
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
  