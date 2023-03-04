import { useQuery } from "react-query"
import { apiEndpoints } from "../../constants/apiEndpoints"
import { queryCacheTime } from "../../constants/settings"
import { Episode } from "../../types/episodes"

export function useEpisode(urls: string[]) {
    const idsRaw = urls.map(url => url.split("/").pop())
    const ids: string[] = idsRaw.filter(id => id !== undefined) as string[]
    ids.sort((a,b) => parseInt(a) - parseInt(b))
    return useQuery(ids, async () => {
        const response = await fetch(apiEndpoints.Episodes.replace(":ids", ids.join(",")))
        const data = await response.json()
        if (urls.length === 1) return [data] as Episode[]
        return data as Episode[]
    }, { cacheTime: queryCacheTime })
}
  