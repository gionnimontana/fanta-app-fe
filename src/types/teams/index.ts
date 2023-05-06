export interface Team {
    id: string
    name: string
    credits: number
    score?: TeamScore
    emoji: string
}

export interface TeamScore {
    "d": number
    "ga": number
    "gf": number
    "l": number
    "mp": number
    "pts": number
    "w": number
  }