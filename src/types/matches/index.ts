export interface Match {
    id: string,
    day: number
    match: string
    result: string
    home_form: string
    away_form: string
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