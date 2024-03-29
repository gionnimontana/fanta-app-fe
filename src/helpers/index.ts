import { Team } from "../types/teams"
import { DPreMatchFormation, DResult, Match, PlayerVote, PreMatchFormation, Score, Votes } from "../types/matches"
import { smartNotification } from "../components/generalUI/notifications/notifications"
import { Player, PlayerMap, Purchase } from "../types/players"
import { marketWindow, playerByRoleBound, roleEmojiMap, validModules } from "../constants/settings"
import { editTeamBotMode } from "../queries/teams"
import { updateMatchFormation } from "../queries/calendar"
import { MatchDayTS } from "../types/utils"
import { ChangeEvent, Dispatch } from "react"
import { APIresponse, pb } from "./pb"
import { routes } from "../constants/routes"
import { createPurchaseOffer, updatePurchaseOffer } from "../queries/players"

export const getCurrentMatchDay = (matchDayTimestamps: MatchDayTS[]): number => {
    const nowTS = new Date().getTime()
    const newTS = nowTS - (24 * 60 * 60 * 1000);
    let matchDay = 1
    for (let i: number = 0; i <= matchDayTimestamps.length; i++) {
        const endTS = new Date(matchDayTimestamps[i]?.end).getTime()
        if (newTS < endTS) {
            matchDay = i + 1
            break
        }
    }
    return matchDay
}

export const getMatchTeamsId = (matchString: string): 
    { homeTeamId: string, awayTeamId: string } => 
{
    const homeTeamId = matchString.split('-')[0]
    const awayTeamId = matchString.split('-')[1]
    return { homeTeamId, awayTeamId }
}

export const sumAllVotes = (votes?: Votes): number => {
    if (!votes) return 0
    return Object.keys(votes).reduce((acc: number, key: string) => {
        return acc + votes[key]
    }, 0)
}

export const getMatchScore = (match: Match, mdTS: MatchDayTS[]): Score => {
    if (isMatchDayIsInProgess(match.day, mdTS)) {
        const home = sumAllVotes(match.result?.home)
        const away = sumAllVotes(match.result?.away)
        return { home, away }
    }
    if (!matchDayHasEnded(match.day, mdTS)) return { home: undefined, away: undefined }
    const dehidratedMatch = match?.result ? match.result.score : null
    return dehidratedMatch ? dehidratedMatch : { home: undefined, away: undefined }
}

export const getMatchTeams = (match: Match, Teams: Team[]): 
    { home: Team | undefined, away: Team | undefined } => 
{
    const { homeTeamId, awayTeamId } = getMatchTeamsId(match.match)
    const home = Teams.find(team => team.id === homeTeamId)
    const away = Teams.find(team => team.id === awayTeamId)
    return { home, away }
}

export const getFormationScore = (f: PlayerVote[]): number => {
    return f.reduce((acc: number, player) => {
        return acc + player.vote
    }, 0)
}

export const sortPlayersByRole = (role: string): number => {
    if (role === 'p') return 4
    if (role === 'd') return 3
    if (role === 'c') return 2
    if (role === 'a') return 1
    return 0
}

export const getPreMatchVotes = (form: DPreMatchFormation | null, players: PlayerMap, votes: PlayerVote[]): 
    PreMatchFormation => {
    let result: PreMatchFormation  = { s: [], b: [], m: '?' }
    if (form) {
        const homeVotes = form.s.reduce((acc: Votes, id: string) => {
            acc[id] = votes.find(v => v.id === id)?.vote || 0
            return acc
        }, {})
        const awayVotes = form.b.reduce((acc: Votes, id: string) => {
            acc[id] = votes.find(v => v.id === id)?.vote || 0
            return acc
        }, {})
        result = { 
            s: getPlayerVotes(homeVotes, players), 
            b: getPlayerVotes(awayVotes, players) ,
            m: form.m.split('').join('-')
        }
    }
    return result
}

export const getPlayerVotes = (votes: Votes, players: PlayerMap): PlayerVote[] => {
    const v = Object.keys(votes).map(key => {
        const player = players[key] 
        return {
            name: player?.name || key,
            vote: votes[key] || 0,
            id: player?.id || key,
            role: player?.role || '?'
        }
    })
    return v.sort((a, b) => sortPlayersByRole(b.role) - sortPlayersByRole(a.role))
}

export const getMatchResult = (match: Match): DResult | null => {
    return match?.result ? match.result : null
}

export const getTeamFormation = (match: Match, players: PlayerMap, teamId: string):
    PreMatchFormation => {
        const { home, away } = getMatchFormations(match, players)
        const isHome = match.match.split('-')[0] === teamId
        const out = isHome ? home : away
        return removeFormationLeavingPlayers(out, players)
}

export const removeFormationLeavingPlayers = (formation: PreMatchFormation, players: PlayerMap): PreMatchFormation => {
    const newFormation = {
        ...formation,
        s: formation.s.filter(p => !players[p.id]?.leaving),
        b: formation.b.filter(p => !players[p.id]?.leaving)
    }
    return newFormation
}

export const getMatchFormations = (match: Match, players: PlayerMap):
    { home: PreMatchFormation, away: PreMatchFormation } => {
    const home = match.home_form ? match.home_form : null
    const away = match.away_form ? match.away_form : null
    const v = getMatchPlayerVotes(match, players)
    const homeVotes = getPreMatchVotes(home, players, v.home)
    const awayVotes = getPreMatchVotes(away, players, v.away)
    return { home: homeVotes, away: awayVotes }
}

export const getMatchPoints = (match: Match, players: PlayerMap): 
    { home: number, away: number } => {
    const v = getMatchPlayerVotes(match, players)
    const totH = getFormationScore(v.home)
    const totA = getFormationScore(v.away)
    return { home: totH, away: totA }
}


export const getMatchPlayerVotes = (match: Match, players: PlayerMap): 
    { home: PlayerVote[], away: PlayerVote[] } => {
    const dResult = getMatchResult(match)
    const homeVotes = dResult?.home || {}
    const awayVotes = dResult?.away || {}
    const home = getPlayerVotes(homeVotes, players)
    const away = getPlayerVotes(awayVotes, players)
    return { home, away }
}

export const getRoster = (team: Team | undefined, players: PlayerMap): Player[] => {
    if (!team) return []
    const roster = Object.keys(players).map(el => players[el])
    return sortPlayerByRole(roster)
}

export const sortPlayerByRole = (players: Player[]) => players.sort((a, b) => sortPlayersByRole(b.role) - sortPlayersByRole(a.role))
export const sortTeamByScore = (teams: Team[]) => teams.sort((a, b) => (b.score?.pts || 0) - (a.score?.pts || 0))
 
export const getMatchIcons = (match: Match, teams: Team[]): { home: string, away: string } => {
    const { homeTeamId, awayTeamId } = getMatchTeamsId(match.match)
    return {
        home: getTeamEmoji(homeTeamId, teams),
        away: getTeamEmoji(awayTeamId, teams)
    }
}

export const getTeamEmoji = (teamId: string | undefined, teams: Team[]): string => {
    if (!teamId) return "🛒"
    const icon = teams.find(t => t.id === teamId)?.emoji
    if (icon) return icon
    return "🛒"
}

export const getPlayerFormationIcon = (playerId: string, formation: PreMatchFormation): string => {
    const starter = formation.s.find(p => p.id === playerId)
    if (starter) return "🏁"
    const bencher = formation.b.find(p => p.id === playerId)
    if (bencher) return "👀"
    return "🍺"
}

export const getNewFormationPlayerChange = (player: Player, formation: PreMatchFormation): PreMatchFormation => {
    const playerId = player.id
    const starter = formation.s.find(p => p.id === playerId)
    if (starter) {
        const newFormation = {
            ...formation,
            s: formation.s.filter(p => p.id !== playerId),
            b: [...formation.b, starter]
        }
        return newFormation
    }
    const bencher = formation.b.find(p => p.id === playerId)
    if (bencher) {
        const newFormation = {
            ...formation,
            b: formation.b.filter(p => p.id !== playerId)
        }
        return newFormation
    }
    const newPlayerVote: PlayerVote = {
        id: playerId,
        name: player.name,
        vote: 0,
        role: player.role
    }
    const newFormation = {
        ...formation,
        s: [...formation.s, newPlayerVote],
    }
    return newFormation
}

export const getNewModuleOnChange = (formation: PreMatchFormation): string => {
    const defenders = formation.s.filter(p => p.role === 'd').length
    const midfielders = formation.s.filter(p => p.role === 'c').length
    const attackers = formation.s.filter(p => p.role === 'a').length
    return `${defenders}-${midfielders}-${attackers}`
}

export const isValidFormation = (formation: PreMatchFormation, module: string): boolean => {
    const validModule = isValidModule(module)
    if (!validModule) {
        smartNotification('Modulo invalido, deve essere uno tra questi: ' + validModules.join(', ')) 
        return false
    }
    const haveOneGoalkeeper = formation.s.filter(p => p.role === 'p').length === 1
    if (!haveOneGoalkeeper) {
        smartNotification('Formazione invalida, ci può essere solo un portiere titolare 🧤') 
        return false
    }
    if (formation.b.length > 12) {
        smartNotification('Errore, Non ci possono essere più di 12 giocatori in panchina 👀')
        return false
    }
    return true
}

export const isValidModule = (module: string): boolean => {
    return validModules.includes(module)
}

export const updateModeMatchTeamFormation = async (match: Match, team: Team, formation: PreMatchFormation, module: string, botMode: boolean, matchDayBegun: boolean): Promise<boolean> => {
    const botModeChanged = team.auto_formation !== botMode
    if (botModeChanged) {
        const success = await editTeamBotMode(botMode)
        if (success.ok) {
            if (botMode) { 
                smartNotification('🤖 BotMode attiva, la formazione verrà gestita dal bot ogni giorno alle 12:00 🤖')
                return true
            }
            else smartNotification('BotMode disattivata, la formazione non verrà più gestita dal bot')
        } else {
            smartNotification('Errore durante il salvataggio della formazione')
        }
    }
    if (botMode) {
        smartNotification('🤖 BotMode attiva, la formazione verrà gestita dal bot ogni giorno alle 12:00 🤖')
        return true
    }
    if (!isValidFormation(formation, module)) return false
    const success = await updateMatchTeamFormation(match, formation, module, matchDayBegun)
    if (success) {
        return true
    } 
    return false
}

export const updateMatchTeamFormation = async (match: Match, formation: PreMatchFormation, module: string, matchDayBegun: boolean): Promise<boolean> => {
    if (matchDayBegun) {
        smartNotification('Non puoi salvare la formazione dopo che i match sono iniziati')
        return false
    } 
    const newFormation: DPreMatchFormation = {
        b: formation.b.map(p => p.id),
        s: formation.s.map(p => p.id),
        m: module.replaceAll('-', '')
    }
    const success = await updateMatchFormation(match.day, newFormation)
    if (success.ok) smartNotification('Formazione salvata con successo')
    else smartNotification('Errore durante il salvataggio della formazione')
    return success.ok
}

export const matchDayHasBegun = (matchDay: number, matchDayTimestamps: MatchDayTS[]): boolean => {
    const now = new Date().getTime()
    const md = matchDayTimestamps.find(md => md.day === matchDay)
    if (!md) return true
    const matchDayHasBegun = now > new Date(md.start).getTime()
    return matchDayHasBegun
}

export const matchDayHasEnded = (matchDay: number, matchDayTimestamps: MatchDayTS[]): boolean => {
    const now = new Date().getTime()
    const md = matchDayTimestamps.find(md => md.day === matchDay)
    if (!md) return true
    const matchDayHasEnded = now > new Date(md.end).getTime()
    return matchDayHasEnded
}

export const isMatchDayIsInProgess = (matchDay: number, matchDayTimestamps: MatchDayTS[]): boolean => {
    const hasBegun = matchDayHasBegun(matchDay, matchDayTimestamps)
    const hasEnded = matchDayHasEnded(matchDay, matchDayTimestamps)
    return hasBegun && !hasEnded
}

export const userCanEditMatch = (match: Match, teamId: string | undefined, matchDayBegun: boolean): boolean => {
    if (!teamId) return false
    const userInMatch = match.match.includes(teamId)
    return userInMatch && !matchDayBegun
}

export const getLocalStoredFilters = (): { [key: string]: string } => {
    const filters = localStorage.getItem('fba_marketfilters')
    if (!filters) return {
        role: 'all',
        team: 'all',
    }
    return JSON.parse(filters)
}

export const setLocalStoredFilters = (filterKey: string, action: Dispatch<React.SetStateAction<string>>) => 
    (e: ChangeEvent<HTMLSelectElement>) => {
    const currentFilters = getLocalStoredFilters()
    currentFilters[filterKey] = e.target.value
    localStorage.setItem('fba_marketfilters', JSON.stringify(currentFilters))
    action(currentFilters[filterKey])
}

export const getAuthUserTeamId = (currentLeague: string | undefined): string | undefined => {
    const userTeam = pb.authStore.model?.team
    if (!userTeam) return undefined
    const leagueId = pb.authStore.model?.league
    if (!leagueId) return undefined
    if (leagueId !== currentLeague) return undefined
    return userTeam
}

export type PurchaseAction = 'makeOffer' | 'acceptOffer' | 'releasePlayer' | 'marketClosed'
export const getPossiblePurchaseActions = (league?: string, player?: Player, purchase?: Purchase): PurchaseAction[] => {
    if (!marketWindowIsOpen()) return ['marketClosed']
    if (!player) return []
    const userTeam = getAuthUserTeamId(league)
    if (!userTeam) return []
    const playerIsInUserTeam = player.fanta_team === userTeam
    if (playerIsInUserTeam) {
        if (purchase) return ['acceptOffer']
        return ['releasePlayer']
    }
    return ['makeOffer']
}

export const marketWindowIsOpen = (): boolean => {
    const now = new Date().getTime()
    const start = new Date(marketWindow.start).getTime()
    const end = new Date(marketWindow.end).getTime()
    return now > start && now < end
}

export const getTeamBudget = (purchases: Purchase[], team?: Team): number => {
    if (!team) return 0
    const budget = team.credits - purchases.reduce((acc, p) => {
        if (p.from_team === team.id && p.validated) return acc - p.price
        else if (p.to_team === team.id) return acc + p.max_price
        return acc
    }, 0)
    return budget
}

export const getPreviousAndNextMatchId = (match: Match | undefined, matches: Match[]): { previous: string | null, next: string | null } => {
    if (!match) return { previous: null, next: null }
    const matchIndex = matches.findIndex(m => m.id === match.id)
    const previous = matches[matchIndex - 1]?.id || matches[matches.length - 1]?.id || null
    const next = matches[matchIndex + 1]?.id  || matches[0]?.id || null
    return { previous, next }
}

export const getPreviousAndNextMatchNavigator = (league: string, match: Match | undefined, matches: Match[], nv: (to: string) => void): { previous: () => void, next: () => void } => {
    const { previous, next } = getPreviousAndNextMatchId(match, matches)
    const previousNavigator = previous ? () => nv(routes.Match.replace(':id', previous).replace(':league', league)) : () => {}
    const nextNavigator = next ? () => nv(routes.Match.replace(':id', next).replace(':league', league)) : () => {}
    return { previous: previousNavigator, next: nextNavigator }
}

export const getPreviousAndNextTeamId = (team: Team | undefined, teams: Team[]): { previous: string | null, next: string | null } => {
    if (!team) return { previous: null, next: null }
    const teamIndex = teams.findIndex(t => t.id === team.id)
    const previous = teams[teamIndex - 1]?.id || teams[teams.length - 1]?.id || null
    const next = teams[teamIndex + 1]?.id  || teams[0]?.id || null
    return { previous, next }
}

export const getPreviousAndNextTeamNavigator = (league: string, team: Team | undefined, teams: Team[], nv: (to: string) => void): { previous: () => void, next: () => void } => {
    const { previous, next } = getPreviousAndNextTeamId(team, teams)
    const previousNavigator = previous ? () => nv(routes.Team.replace(':id', previous).replace(':league', league)) : () => {}
    const nextNavigator = next ? () => nv(routes.Team.replace(':id', next).replace(':league', league)) : () => {}
    return { previous: previousNavigator, next: nextNavigator }
}

export const getCurrentPlayerByRole = (players: PlayerMap, role: string, outPurchase: Purchase[]): number => {
    const currentPlayers = Object.keys(players).filter(id => players[id].role === role)
    const outIds = outPurchase.map(p => p.player)
    const outPlayers = currentPlayers.filter(p => outIds.includes(p))
    return currentPlayers.length - outPlayers.length
}

export const getCurrentPurchaseByRole = (players: PlayerMap, role: string, inPurchase: Purchase[]): number => {
    const currentPlayers = Object.keys(players).filter(id => players[id].role === role)
    const inIds = inPurchase.map(p => p.player)
    const inPlayers = currentPlayers.filter(p => inIds.includes(p))
    return inPlayers.length
}

export const getMaxPlayerByRole = (role: string): number => {
    const extremes = playerByRoleBound[role as keyof typeof playerByRoleBound]
    return extremes?.max || 0
}

export const getMinPlayerByRole = (role: string): number => {
    const extremes = playerByRoleBound[role as keyof typeof playerByRoleBound]
    return extremes?.min || 0
}

export const getMaxPurchaseByRole = (role: string, currentHouse: number) => {
    const extremes = playerByRoleBound[role as keyof typeof playerByRoleBound]
    return extremes?.max ? extremes.max - currentHouse : 0
}

export const getMinPurchaseByRole = (role: string, currentHouse: number) => {
    const extremes = playerByRoleBound[role as keyof typeof playerByRoleBound]
    return extremes?.min ? extremes.min - currentHouse : 0
}

export const canMakeOffer = (league: string | undefined, role: string | undefined, players: PlayerMap, purchases: Purchase[]): boolean => {
    const teamId = getAuthUserTeamId(league)
    if (!role || !teamId) return false
    const inPurchase = purchases.filter(p => p.to_team === teamId)
    const outPurchase = purchases.filter(p => p.from_team === teamId && p.validated)
    const currentPurchaseByRole = getCurrentPurchaseByRole(players, role, inPurchase)
    const teamplayers: PlayerMap = Object.keys(players).reduce((acc: PlayerMap, id) => {
        if (players[id].fanta_team === teamId) acc[id] = players[id]
        return acc
    }, {})
    const currentHouse = getCurrentPlayerByRole(teamplayers, role, outPurchase)
    const maxPurchaseByRole = getMaxPurchaseByRole(role, currentHouse)
    return currentPurchaseByRole < maxPurchaseByRole
}

export const canReleasePlayer = (role: string | undefined, players: PlayerMap, purchases: Purchase[]): boolean => {
    if (!role) return false
    const outPurchases = purchases.filter(p => p.validated)
    const currentPlayers = getCurrentPlayerByRole(players, role, outPurchases)
    const minPlayers = getMinPlayerByRole(role)
    return currentPlayers > minPlayers
}

export const getRoleEmoji = (role: string): string => {
    const roleIcon = roleEmojiMap[role as keyof typeof roleEmojiMap]
    if (roleIcon) return roleIcon
    return "❓"
}

export const getPurchasePerPlayerMap = (purchases: Purchase[]): {[playerId: string]: Purchase} => {
    const purchasPerPlayerMap = purchases.reduce((acc: {[playerId: string]: Purchase}, p) => {
        acc[p.player] = p
        return acc
    }, {})
return purchasPerPlayerMap
}

export const getRankEmoji = (rank: number): string => {
    if (rank === 0) return "🥇"
    if (rank === 1) return "🥈"
    if (rank === 2) return "🥉"
    return `#${rank + 1}`
}

export const addLeavingPlayers = (players: PlayerMap | undefined, purchases: Purchase[] | undefined): PlayerMap => {
    if (!purchases) return players || {}
    if (!players) return {}
    const purchasPerPlayerMap = getPurchasePerPlayerMap(purchases)
    const playersWithLeaving = Object.keys(players).reduce((acc: PlayerMap, id) => {
        const player = players[id]
        const purchase = purchasPerPlayerMap[id]
        if (purchase && purchase.validated) {
                acc[id] = {
                    ...player,
                    leaving: true
                }
        } else acc[id] = player
        return acc
    }, {})
    return playersWithLeaving
}

export const getPlayerLeavingName = (player: Player): string => {
    if (player.leaving) return `${player.name} 🛒`
    return player.name
}


export const getTeamPlayers = (teamId: string | undefined, players: PlayerMap): PlayerMap => {
    if (!teamId) return {}
    const teamplayers: PlayerMap = Object.keys(players).reduce((acc: PlayerMap, id) => {
        if (players[id].fanta_team === teamId) acc[id] = players[id]
        return acc
    }, {})
    return teamplayers
}

export const makePurchaseOffer = async (userTeam: string | undefined, purchase: Purchase | undefined, player: Player, price: number): Promise<boolean> => {
    const isFreePlayer = !Boolean(player?.fanta_team)
    if (purchase && isFreePlayer && userTeam === purchase?.to_team) {
        await updatePurchaseOffer(purchase.id, {price: purchase.price, max_price: price})
        smartNotification(`Il rilancio automatico per questo giocatore è stato settato a ${price}`)
        return false
    }
    let purchaseChange = false
    let canHandleOffer = true
    let minimalOffer = isFreePlayer ? player.fvm : price
    if (purchase && isFreePlayer) {
        minimalOffer = purchase.price + 1
        if (price < purchase.max_price) {
            canHandleOffer = false
            await updatePurchaseOffer(purchase.id, {price: price})
            purchaseChange = true
            smartNotification(`La tua offerta è stata rifiutata perché l'utente ha settato una soglia di rilancio automatico superiore alla tua. L'offerta è stata aggiornata a ${price}`)
        }
    }
    if (canHandleOffer) {
        let res: APIresponse = {ok : false}
        if (purchase) {
            res = await updatePurchaseOffer(purchase.id, {price: minimalOffer, max_price: price})
        } else {
            res = await createPurchaseOffer(player.id, minimalOffer, price)
        }
        if (res.ok) {
            smartNotification('Offerta creata con successo')
            purchaseChange = true
        } else smartNotification('Qualcosa è andato storto, nessun acquisto trovato, contatta l\'amministratore')
    }

    return purchaseChange
}