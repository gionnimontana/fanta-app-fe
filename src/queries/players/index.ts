import { useQuery, useQueryClient } from "react-query";
import { Player, PlayerMap, Purchase } from "types/players";
import { apiEndpoints } from "../../constants/apiEndpoints";
import { queryCacheTime } from "../../constants/settings";
import { useEffect } from "react";
import { pb, pbDelete, pbUpdate } from "../../helpers/pb";
import { TeamPlayer } from "../../types/teams";
import { sendPostRequest } from "../../helpers/editApi";

export function usePlayers() {
    return useQuery(`players`, async () => {
        const leagueID = 'ernyanuus7tdszx'
        const page1Req = await fetch(apiEndpoints.Players + '?perPage=500&page=1')
        const page2Req = await fetch(apiEndpoints.Players + '?perPage=500&page=2')
        const teamPlayerReq = await fetch(apiEndpoints.TeamPlayers + `?perPage=500&filter=(league='${leagueID}')`)
        const teamPlayers = await teamPlayerReq.json() || { items: [] }
        const teamPlayersMap = teamPlayers.items.reduce((acc: {[id: string]: string }, tp: TeamPlayer) => {
            acc[tp.player] = tp.team
            return acc
        }, {})
        const page1 = await page1Req.json() || { items: [] }
        const page2 = await page2Req.json() || { items: [] }
        const allPlayers = [...page1.items,...page2.items] as Player[]
        const playerMap = allPlayers.reduce((acc: PlayerMap, player) => {
            acc[player.id] = {
                ...player,
                fanta_team: teamPlayersMap[player.id] || ''
            }
            return acc
        }, {} as {[key: string]: Player})
        return playerMap
    }, { cacheTime: queryCacheTime, staleTime: queryCacheTime });
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

export async function createPurchaseOffer(playerId: string, price: number, max_price: number): Promise<{ ok: boolean }> {
    const data = {
        "player": playerId,
        "price": price,
        "max_price": max_price,
    }
    return sendPostRequest(apiEndpoints.PurchaseOffer, data)
}

export function updatePurchaseOffer(purchaseId: string, payload: {[k: string]: any}) {
    return pbUpdate('purchases', purchaseId, payload)
}

export function deletePurchaseOffer(purchaseId: string) {
    return pbDelete('purchases', purchaseId)
}

export const usePurchasesSubscription = () => {
    const queryClient = useQueryClient()
    useEffect(() => {
        pb.collection('purchases').subscribe('*', function (e) {
            queryClient.invalidateQueries(`purchase-players`)
        });
        return () => {
            pb.collection('purchases').unsubscribe();
        }
    },[])
}
  