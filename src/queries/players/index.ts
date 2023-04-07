import { useQuery } from "react-query";
import { apiEndpoints } from "../../constants/apiEndpoints";
import { queryCacheTime } from "../../constants/settings";

export function usePlayers() {
    return useQuery(`players`, async () => {
        const page1Req = await fetch(apiEndpoints.Players + '?perPage=500&page=1')
        const page2Req = await fetch(apiEndpoints.Players + '?perPage=500&page=2')
        const page1 = await page1Req.json()
        const page2 = await page2Req.json()
        console.log(page1, page2)
        return []
    }, { cacheTime: queryCacheTime });
}

export function usePlayer(id: string) {
    return useQuery(`player-${id}`, async () => {
        const response = await fetch(apiEndpoints.Players + `/:${id}`)
        const data = await response.json()
        const player = data
        return player
    }, { cacheTime: queryCacheTime });
}
  