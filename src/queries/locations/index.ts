import { useQuery } from "react-query"
import { queryCacheTime } from "../../constants/settings"
import { RMLocation } from "../../types/locations"

export function useLocation(url: string) {
    return useQuery(url, async () => {
        const response = await fetch(url)
        const data = await response.json()
        const location = data as RMLocation
        return location
    }, { cacheTime: queryCacheTime })
}
  