import { useEffect, useState } from "react"
import { getCharacters } from "../../api/characters"
import { Character } from "../../types/characters"

export const useCharacters = () => {
    const [characters, setCharacters] = useState<Character[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async (refresh?: boolean) => {
        setIsLoading(true)
        setError(null)
        try {
            const characters = await getCharacters(refresh)
            if (characters) setCharacters(characters)
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
        characters,
        updateCache
    }
}