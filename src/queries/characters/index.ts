import { useQuery } from "react-query";
import { apiEndpoints } from "../../constants/apiEndpoints";
import { queryCacheTime } from "../../constants/settings";
import { Character } from "../../types/characters";

export function useCharacters(pageId: number) {
    return useQuery(`character-page-${pageId}`, async () => {
        const response = await fetch(apiEndpoints.Characters.replace(":pageId", pageId.toString()))
        const data = await response.json()
        const characters = data as { info: { pages: number }, results: Character[] }
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
  