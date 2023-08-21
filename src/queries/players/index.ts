import { useQuery } from "react-query";
import { Match } from "types/matches";
import { Player, PlayerMap, Purchase } from "types/players";
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

export function usePlayer(id?: string) {
    return useQuery(`player-${id}`, async () => {
        const response = await fetch(apiEndpoints.Players + `/${id}`)
        const data = await response.json()
        const player = data as Player
        return player
    }, { cacheTime: queryCacheTime, staleTime: queryCacheTime  });
}

export const useTeamPlayers = (teamId?: string) => {
    return useQuery(`team-players-${teamId}`, async () => {
    const urlParams = `?&perPage=60&filter=(fanta_team='${teamId}')`
    const response = await fetch(apiEndpoints.Players + urlParams)
    const data = await response.json()
    const matchPlayers = data.items as Player[]
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
        const urlParams = `?&perPage=60&filter=(fanta_team='${h}'|| fanta_team='${a}')`
        const response = await fetch(apiEndpoints.Players + urlParams)
        const data = await response.json()
        const matchPlayers = data.items as Player[]
        const playerMap = matchPlayers.reduce((acc: PlayerMap, player) => {
            acc[player.id] = player
            return acc
        }, {} as {[key: string]: Player})
        return playerMap
    }, { cacheTime: queryCacheTime, staleTime: queryCacheTime  });
}

export const usePurchasePlayer = (purchaseId?: string) => {
    return useQuery(`purchase-player-${purchaseId}`, async () => {
        const urlParams = `?&filter=(id='${purchaseId}')&expand=player`
        const response = await fetch(apiEndpoints.Purchases + urlParams)
        const data = await response.json()
        console.log('ooooooo', data)
        return []
    }, { cacheTime: queryCacheTime, staleTime: queryCacheTime  });
}

export function useOpenPurchasePlayers(){
    return useQuery('purchase-players', async () => {
        const urlParams = `?&perPage=500&filter=(closed=false)`
        const response = await fetch(apiEndpoints.Purchases + urlParams)
        const data = await response.json()
        const openPurchasePlayers = data.items as Purchase[]
        return openPurchasePlayers
    }, { cacheTime: queryCacheTime, staleTime: queryCacheTime  });
}

export function createPurchaseOffer(playerId: string, from_team: string, to_team: string | null, price: number) {
    return fetch(apiEndpoints.Purchases, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "player": playerId,
            "to_team": to_team,
            "from_team": from_team,
            "price": price,
            "closed": false,
            "validated": to_team ? false : true
        })
    })
}

export function updatePurchaseOffer(purchaseId: string, payload: {[k: string]: any}) {
    return fetch(apiEndpoints.Purchases + `/${purchaseId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
}
  