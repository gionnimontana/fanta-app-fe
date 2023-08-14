export interface Player {
    id: string
    name: string
    team: string
    fvm: number
    starter_index: number
    role: string
    play_next_match: number
    price?: number
}

export interface PlayerMap {
    [key: string]: Player
}