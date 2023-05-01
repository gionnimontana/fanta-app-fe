import { Team } from "../types/teams"
import { DPreMatchFormation, DResult, Match, PlayerVote, PreMatchFormation, Score, Votes } from "../types/matches"
import { Player, PlayerMap } from "../types/players"

export const getCurrentMatchDay = (): number => {
    const nowTS = new Date().getTime()
    if (nowTS < 1682542800000) return 31
    if (nowTS < 1682935200000) return 32
    if (nowTS < 1683154800000) return 33
    if (nowTS < 1683154800000) return 34
    if (nowTS < 1683154800000) return 35
    if (nowTS < 1685037600000) return 36
    if (nowTS < 1685642400000) return 37
    return 38
}

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

export const getMatchFormations = (match: Match, players: PlayerMap):
    { home: PreMatchFormation, away: PreMatchFormation } => {
    const home = match.home_form ? JSON.parse(match.home_form) as DPreMatchFormation : null
    const away = match.away_form ? JSON.parse(match.away_form) as DPreMatchFormation : null
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
    const dPlayers = team.players.split('@')
    const roster = dPlayers.map(id => players[id] || { id, name: id, role: '?' })
    return sortPlayerByRole(roster)
}

export const sortPlayerByRole = (players: Player[]) => players.sort((a, b) => sortPlayersByRole(b.role) - sortPlayersByRole(a.role))
export const sortTeamByScore = (teams: Team[]) => teams.sort((a, b) => (b.score?.pts || 0) - (a.score?.pts || 0))
 
export const getMatchIcons = (match: Match): { home: string, away: string } => {
    const { homeTeamId, awayTeamId } = getMatchTeamsId(match.match)
    return {
        home: getTeamEmoji(homeTeamId),
        away: getTeamEmoji(awayTeamId)
    }
}

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
