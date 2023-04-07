import { useQuery } from "react-query";
import { Match } from "types/matches";
import { apiEndpoints } from "../../constants/apiEndpoints";
import { queryCacheTime } from "../../constants/settings";

export function useCalendar(day: number) {
    return useQuery(`calendar-${day}`, async () => {
        const response = await fetch(apiEndpoints.Calendar + `?filter=(day=${day})`)
        const data = await response.json()
        const calendar = data
        console.log(calendar.items)
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
  