import { useQuery } from "react-query"
import { DPreMatchFormation, Match } from "../../types/matches"
import { apiEndpoints } from "../../constants/apiEndpoints"
import { queryCacheTime } from "../../constants/settings"
import { MatchDayTS } from "types/utils"
import { APIresponse } from "../../helpers/pb"
import { sendPatchRequest } from "../../helpers/editApi"
import { pb } from "../../helpers/pb"

export function useMatchDayTS() {
    return useQuery(`schedules`, async () => {
        const response = await fetch(apiEndpoints.Schedules + `?perPage=50&sort=day`)
        const data = await response.json()
        const calendar = data
        return calendar.items as MatchDayTS[]
    }, { cacheTime: queryCacheTime, staleTime: queryCacheTime });
}

export function useCalendar(leagueId: string | undefined, day?: number) {
    return useQuery(`calendar-${day}-${leagueId}`, async () => {
        if (!day) return []
        const response = pb.collection('calendar').getList(1, 40, {
            filter: `(day='${day}' && league='${leagueId}')`
        });
        const data = await response
        const calendar = data.items as any
        return calendar as Match[]
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

export async function updateMatchFormation(day: number, formation: DPreMatchFormation): Promise<APIresponse> {
    const payload = {day, formation}
    return await sendPatchRequest(apiEndpoints.EditFormation, payload)
}
  