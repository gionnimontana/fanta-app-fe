import { Team } from "../types/teams"
import { DResult, Match, PlayerVote, Score, Votes } from "../types/matches"
import { PlayerMap } from "../types/players"

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

export const getPlayerVotes = (votes: Votes, players: PlayerMap): PlayerVote[] => {
    return Object.keys(votes).map(key => {
        const player = players[key]
        return {
            name: player.name,
            vote: votes[key],
            id: player.id,
            role: player.role
        }
    })
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
