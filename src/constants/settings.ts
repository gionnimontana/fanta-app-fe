export const queryCacheTime = 1000 * 60 * 60 * 24 * 5// 1 day

export const validModules = [
    '5-3-2',
    '5-4-1',
    '4-5-1',
    '4-4-2',
    '4-3-3',
    '3-5-2',
    '3-4-3',
    '3-6-1'
]

export const marketWindow = {
    start: '2023-08-01T00:00:00',
    end: '2023-09-15T23:59:59'
}

export const playerByRoleBound = {
    p: { max: 3, min: 2 },
    d: { max: 10, min: 5 },
    c: { max: 10, min: 5 },
    a: { max: 8, min: 3 }
}

export const roleEmojiMap = {
    p: "🖐",
    d: "🛡️",
    c: "🏹",
    a: "⚔️"
}