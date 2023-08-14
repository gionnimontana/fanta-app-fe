import { useQuery } from "react-query";
import { Match } from "types/matches";
import { Player, PlayerMap } from "types/players";
import { apiEndpoints } from "../../constants/apiEndpoints";
import { queryCacheTime } from "../../constants/settings";

export function usePlayers() {
    return useQuery(`players`, async () => {
        const page1Req = await fetch(apiEndpoints.Players + '?perPage=500&page=1')
        const page2Req = await fetch(apiEndpoints.Players + '?perPage=500&page=2')
        const page1 = await page1Req.json() || { items: [] }
        const page2 = await page2Req.json() || { items: [] }
        const allPlayers = [...page1.items,...page2.items] as Player[]
        const playerMap = allPlayers.reduce((acc: PlayerMap, player) => {
            acc[player.id] = player
            return acc
        }, {} as {[key: string]: Player})
        return playerMap
    }, { cacheTime: queryCacheTime, staleTime: queryCacheTime });
}

export function usePlayer(id: string) {
    return useQuery(`player-${id}`, async () => {
        const response = await fetch(apiEndpoints.Players + `/:${id}`)
        const data = await response.json()
        const player = data
        return player
    }, { cacheTime: queryCacheTime, staleTime: queryCacheTime  });
}

export const useTeamPlayers = (teamId?: string) => {
    return useQuery(`team-players-${teamId}`, async () => {
    const urlParams = `?&perPage=60&filter=(team='${teamId}')&expand=player`
    const response = await fetch(apiEndpoints.Purchases + urlParams)
    const data = await response.json()
    const matchPlayers = data.items.map((el: any) => ({
        ...el.expand.player,
        price: el.price
    })) as Player[]
    const playerMap = matchPlayers.reduce((acc: PlayerMap, player) => {
        acc[player.id] = player
        return acc
    }, {} as {[key: string]: Player})
    return playerMap
}, { cacheTime: queryCacheTime, staleTime: queryCacheTime  });
}

export function useMatchPlayers(match: Match) {
    return useQuery(`match-players-${match.id}`, async () => {
        const h = match.match.split('-')[0]
        const a = match.match.split('-')[1]
        const urlParams = `?&perPage=60&filter=(team='${h}'||team='${a}')&expand=player`
        const response = await fetch(apiEndpoints.Purchases + urlParams)
        const data = await response.json()
        const matchPlayers = data.items.map((el: any) => el.expand.player) as Player[]
        const playerMap = matchPlayers.reduce((acc: PlayerMap, player) => {
            acc[player.id] = player
            return acc
        }, {} as {[key: string]: Player})
        return playerMap
    }, { cacheTime: queryCacheTime, staleTime: queryCacheTime  });
}
  