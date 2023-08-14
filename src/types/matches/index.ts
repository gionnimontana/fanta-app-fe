export interface Match {
    id: string,
    day: number
    match: string
    result: string
    home_form: DPreMatchFormation
    away_form: DPreMatchFormation
}
export interface DResult {
    home: Votes,
    away: Votes,
    score: Score
}

export interface Votes { [key: string]: number }

export interface Score {
    home: number | undefined
    away: number | undefined
}

export interface PlayerVote {
    name: string
    vote: number
    id: string
    role: string
}

export interface DPreMatchFormation {
    s: string[]
    b: string[]
    m: string
}

export interface PreMatchFormation {
    s: PlayerVote[]
    b: PlayerVote[]
    m: string
}