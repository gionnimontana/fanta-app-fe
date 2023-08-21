import { Team } from "../types/teams"
import { DPreMatchFormation, DResult, Match, PlayerVote, PreMatchFormation, Score, Votes } from "../types/matches"
import { Player, PlayerMap, Purchase } from "../types/players"
import { marketWindow, validModules } from "../constants/settings"
import { editTeamBotMode } from "../queries/teams"
import { updateMatchFormation } from "../queries/calendar"
import { MatchDayTS } from "types/utils"
import { ChangeEvent, Dispatch } from "react"
import { pb } from "./pb"

export const getCurrentMatchDay = (matchDayTimestamps: MatchDayTS[]): number => {
    const nowTS = new Date().getTime()
    let matchDay = 1
    for (let i: number = 0; i <= matchDayTimestamps.length; i++) {
        const endTS = new Date(matchDayTimestamps[i]?.end).getTime()
        if (nowTS < endTS) {
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

export const getMatchScore = (match: Match, mdTS: MatchDayTS[]): Score => {
    if (!matchDayHasEnded(match.day, mdTS)) return { home: undefined, away: undefined }
    const dehidratedMatch = match?.result ? JSON.parse(match.result)?.score as Score : null
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
    return match?.result ? JSON.parse(match.result) as DResult : null
}

export const getTeamFormation = (match: Match, players: PlayerMap, teamId: string):
    PreMatchFormation => {
        const { home, away } = getMatchFormations(match, players)
        const isHome = match.match.split('-')[0] === teamId
        return isHome ? home : away
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

export const getTeamEmoji = (teamId: string, teams: Team[]): string => {
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
        alert('Invalid formation, you must use one of the following modules: ' + validModules.join(', ')) 
        return false
    }
    const haveOneGoalkeeper = formation.s.filter(p => p.role === 'p').length === 1
    if (!haveOneGoalkeeper) {
        alert('Invalid formation, there must be only one goalkeeper (P)') 
        return false
    }
    if (formation.b.length > 12) {
        alert('There cannot be over 12 players on the bench 👀')
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
        const success = await editTeamBotMode(team.id, botMode)
        if (success) {
            if (botMode) { 
                alert('🤖 Bot mode enabled, the formation will be managed by the bot each day at 12:00 and at the beginning of the first match 🤖')
                return true
            }
            else alert('Bot mode disabled, the formation in use will be the one you set on this screen')
        } else {
            alert('Error while updating bot mode')
        }
    }
    if (botMode) {
        alert('Bot mode is on, the formation will be managed by the bot each day at 12:00 and at the beginning of the first match')
        return true
    }
    if (!isValidFormation(formation, module)) return false
    const success = await updateMatchTeamFormation(team.id, match, formation, module, matchDayBegun)
    if (success) {
        return true
    } 
    return false
}

export const updateMatchTeamFormation = async (teamID: string, match: Match, formation: PreMatchFormation, module: string, matchDayBegun: boolean): Promise<boolean> => {
    if (matchDayBegun) {
        alert('You cannot change the formation after the match day has begun')
        return false
    } 
    const isHome = match.match.split('-')[0] === teamID
    const newFormation: DPreMatchFormation = {
        b: formation.b.map(p => p.id),
        s: formation.s.map(p => p.id),
        m: module.replaceAll('-', '')
    }
    const success = await updateMatchFormation(match.id, isHome, newFormation)
    if (success) alert('Formations saved successfully')
    else alert('Error while saving formations')
    return success
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

export const userCanEditMatch = (match: Match, teamId: string, matchDayBegun: boolean): boolean => {
    const userInMatch = match.match.includes(teamId)
    return userInMatch && !matchDayBegun
}

export const getLocalStoredFilters = (): { [key: string]: string } => {
    const filters = localStorage.getItem('marketfilters')
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
    localStorage.setItem('marketfilters', JSON.stringify(currentFilters))
    action(currentFilters[filterKey])
}

export type PurchaseAction = 'makeOffer' | 'acceptOffer' | 'cancelOffer' | 'releasePlayer' | 'marketClosed'
export const getPossiblePurchaseActions = (player?: Player, purchase?: Purchase): PurchaseAction[] => {
    if (!marketWindowIsOpen()) return []
    if (!player) return []
    const userTeam = pb.authStore.model?.team;
    if (!userTeam) return []
    const playerIsInUserTeam = player.fanta_team === userTeam
    if (playerIsInUserTeam) {
        if (purchase) return ['acceptOffer']
        return ['releasePlayer']
    }
    if (userTeam === purchase?.team) return ['cancelOffer']
    return ['makeOffer']
}

export const marketWindowIsOpen = (): boolean => {
    const now = new Date().getTime()
    const start = new Date(marketWindow.start).getTime()
    const end = new Date(marketWindow.end).getTime()
    return now > start && now < end
}

export const getTeamBudget = (purchases: Purchase[], players: PlayerMap, team?: Team): number => {
    if (!team) return 0
    const budget = team.credits - purchases.reduce((acc, p) => {
        const purchaseTeam = players[p.player]?.fanta_team
        if (purchaseTeam === team.id && p.validated) return acc + p.price
        else if (p.team === team.id) return acc - p.price
        return acc
    }, 0)
    return budget
}