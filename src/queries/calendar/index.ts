import { useQuery } from "react-query";
import { DPreMatchFormation, Match, PreMatchFormation } from "../../types/matches";
import { apiEndpoints } from "../../constants/apiEndpoints";
import { queryCacheTime } from "../../constants/settings";

export function useCalendar(day: number) {
    return useQuery(`calendar-${day}`, async () => {
        const response = await fetch(apiEndpoints.Calendar + `?filter=(day=${day})`)
        const data = await response.json()
        const calendar = data
        return calendar.items as Match[]
    }, { cacheTime: queryCacheTime, staleTime: queryCacheTime });
}

export function useMatch(id: string) {
    return useQuery(`match-${id}`, async () => {
        const response = await fetch(apiEndpoints.Calendar + `/${id}`)
        const data = await response.json()
        const match = data
        return match as Match
    }, { cacheTime: queryCacheTime, staleTime: queryCacheTime  });
}

export async function updateMatchFormation(id: string, isHome: boolean, formation: DPreMatchFormation): Promise<boolean> {
    const targetField = isHome ? 'home_form' : 'away_form'
    const results = await fetch(apiEndpoints.Calendar + `/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ [targetField]: formation })
    })
    return results.ok
}
  