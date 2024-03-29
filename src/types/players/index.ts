export interface Player {
    id: string
    name: string
    team: string
    fvm: number
    starter_index: number
    role: string
    play_next_match: number
    fanta_team?: string
    leaving?: boolean
}

export interface PlayerMap {
    [key: string]: Player
}

export interface Purchase {
    id: string
    player: string
    from_team: string
    to_team: string
    price: number
    closed: boolean
    validated: boolean
    updated: string
    max_price: number
    league: string
}