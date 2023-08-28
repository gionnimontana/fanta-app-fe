import { useQuery } from "react-query";
import { DPreMatchFormation, Match } from "../../types/matches";
import { apiEndpoints } from "../../constants/apiEndpoints";
import { queryCacheTime } from "../../constants/settings";
import { MatchDayTS } from "types/utils";
import { APIresponse, pbUpdate } from "../../helpers/pb";

export function useMatchDayTS() {
    return useQuery(`schedules`, async () => {
        const response = await fetch(apiEndpoints.Schedules + `?perPage=50&sort=day`)
        const data = await response.json()
        const calendar = data
        return calendar.items as MatchDayTS[]
    }, { cacheTime: queryCacheTime, staleTime: queryCacheTime });
}

export function useCalendar(day?: number) {
    return useQuery(`calendar-${day}`, async () => {
        if (!day) return []
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

export async function updateMatchFormation(id: string, isHome: boolean, formation: DPreMatchFormation): Promise<APIresponse> {
    const targetField = isHome ? 'home_form' : 'away_form'
    const body = { [targetField]: formation }
    return pbUpdate('calendar', id, body)
}
  