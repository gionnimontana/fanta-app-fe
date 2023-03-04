import { useEffect, useState } from "react"
import { getCharacter } from "../../api/characters"
import { Character } from "../../types/characters"

export const useCharacter = (id?: string) => {
    const [character, setCharacter] = useState<Character | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async (refresh?: boolean) => {
        if (!id) return
        setError(null)
        try {
            setIsLoading(true)
            const character = await getCharacter(id, refresh)
            if (character) setCharacter(character)
        }
        catch (e: any) {
            setError(e.message.toString())
        }
        finally {
            setIsLoading(false)
        }
    }

    const updateCache = () => fetchData(true)

    return {
        isLoading,
        error,
        character,
        updateCache
    }
}