export interface Player {
    id: string
    name: string
    team: string
    price: number
    fvm: number
    starter_index: number
    role: string
    play_next_match: number
}

export interface PlayerMap {
    [key: string]: Player
}