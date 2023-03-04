import { useQuery } from "react-query";
import { apiEndpoints } from "../../constants/apiEndopoints";
import { queryCacheTime } from "../../constants/settings";
import { Character } from "../../types/characters";

export function useCharacters() {
    return useQuery("character-all", async () => {
        const response = await fetch(apiEndpoints.Characters)
        const data = await response.json()
        const characters = data.results as Character[]
        return characters
    }, { cacheTime: queryCacheTime });
}

export function useCharacter(id: string) {
    return useQuery(`characters-${id}`, async () => {
        const response = await fetch(apiEndpoints.Character.replace(":id", id))
        const data = await response.json()
        const characters = data as Character
        return characters
    }, { cacheTime: queryCacheTime });
}
  