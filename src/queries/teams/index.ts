import { useQuery } from "react-query";
import { Team } from "../../types/teams";
import { apiEndpoints } from "../../constants/apiEndpoints";
import { queryCacheTime } from "../../constants/settings";
import { getTeamEmoji } from "../../helpers";

export function useTeams() {
    return useQuery(`teams`, async () => {
        const response = await fetch(apiEndpoints.Teams)
        const data = await response.json()
        const teams = data.items as Team[]
        const EmojiTeams: Team[] = teams.map(team => ({
            ...team,
            emoji: getTeamEmoji(team.id)
        }))
        return EmojiTeams
    }, { cacheTime: queryCacheTime, staleTime: queryCacheTime  });
}

export function useTeam(id: string) {
    return useQuery(`team-${id}`, async () => {
        const response = await fetch(`${apiEndpoints.Teams}/${id}`)
        const data = await response.json()
        const team = data as Team
        const emojiTeam: Team = {
            ...team,
            emoji: getTeamEmoji(team.id)
        }
        return emojiTeam
    }, { cacheTime: queryCacheTime, staleTime: queryCacheTime  });
}
  