import { Team } from "../types/teams"
import { DResult, Match, PlayerVote, Score, Votes } from "../types/matches"
import { Player, PlayerMap } from "../types/players"

export const getMatchTeamsId = (matchString: string): 
    { homeTeamId: string, awayTeamId: string } => 
{
    const homeTeamId = matchString.split('-')[0]
    const awayTeamId = matchString.split('-')[1]
    return { homeTeamId, awayTeamId }
}

export const getMatchScore = (match: Match): Score => {
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

export const getVoteSortValue = (role: string): number => {
    if (role === 'p') return 4
    if (role === 'd') return 3
    if (role === 'c') return 2
    if (role === 'a') return 1
    return 0
}

export const getPlayerVotes = (votes: Votes, players: PlayerMap): PlayerVote[] => {
    const v = Object.keys(votes).map(key => {
        const player = players[key] 
        return {
            name: player?.name || key,
            vote: votes[key],
            id: player?.id || key,
            role: player?.role || '?'
        }
    })
    return v.sort((a, b) => getVoteSortValue(b.role) - getVoteSortValue(a.role))
}

export const getMatchPlayerVotes = (match: Match, players: PlayerMap): 
    { home: PlayerVote[], away: PlayerVote[] } => {
    const dMatch = match?.result ? JSON.parse(match.result) as DResult : null
    const homeVotes = dMatch?.home || {}
    const awayVotes = dMatch?.away || {}
    const home = getPlayerVotes(homeVotes, players)
    const away = getPlayerVotes(awayVotes, players)
    return { home, away }
}

export const getRoster = (team: Team | undefined, players: PlayerMap): Player[] => {
    if (!team) return []
    const dPlayers = team.players.split('@')
    const roster = dPlayers.map(id => players[id] || { id, name: id, role: '?' })
    return roster
}

export const sortTeamByScore = (teams: Team[]) => teams.sort((a, b) => (b.score?.pts || 0) - (a.score?.pts || 0))

export const getTeamEmoji = (teamId: string): string => {
    if (teamId === '2i78s1fyv5d6fo6') return "🦁"
    if (teamId === 'lglfoeo3fexn9zu') return "🐨"
    if (teamId === '1uusht0d6gxsd3v') return "🐻"
    if (teamId === 'gyyt4tcc6y75svy') return "🐯"
    if (teamId === 'y2ws9gqj1ihhq3w') return "🐼"
    if (teamId === 'e3rezqjrehi9f7c') return "🐭"
    if (teamId === '1vwghf9milzueau') return "🐵"
    if (teamId === 'zm8qz94b8bbe3of') return "🐶"
    if (teamId === 'mwwynginrfohyuc') return "🐓"
    if (teamId === 'fmfnbk3o5cmq5e2') return "🐸"
    return "👀"
}
