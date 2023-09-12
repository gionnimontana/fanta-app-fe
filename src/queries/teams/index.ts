import { useQuery } from "react-query";
import { Team } from "../../types/teams";
import { apiEndpoints } from "../../constants/apiEndpoints";
import { queryCacheTime } from "../../constants/settings";
import { APIresponse } from "../../helpers/pb";
import { sendPatchRequest } from "../../helpers/editApi";

export function useTeams(leagueId: string | undefined) {
    return useQuery(`teams-${leagueId}`, async () => {
        const url = apiEndpoints.Teams + `?filter=(league='${leagueId}')`
        const response = await fetch(url)
        const data = await response.json()
        const teams = data.items as Team[]
        return teams
    }, { cacheTime: queryCacheTime, staleTime: queryCacheTime  });
}

export const editTeamBotMode = async (botMode: boolean): Promise<APIresponse> => {
    const payload = {auto_formation: botMode}
    return await sendPatchRequest(apiEndpoints.EditAutoFormation, payload)
}

  