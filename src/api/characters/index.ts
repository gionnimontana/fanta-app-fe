import { apiEndpoints } from "../../constants/apiEndopoints";
import { Character } from "../../types/characters";

interface Cache {
    characters: Character[];
    isFetchingCharacters: boolean;
    isFetchingCharacter: string | null;
}

const cache: Cache = {
    characters: [],
    isFetchingCharacters: false,
    isFetchingCharacter: null,
}

export const getCharacters = async (refresh?: boolean): Promise<Character[] | undefined> => {
    if (cache.isFetchingCharacters) return;
    if (cache.characters.length === 20 && !refresh) return cache.characters;
    try {
        cache.isFetchingCharacters = true;
        const response = await fetch(apiEndpoints.Characters);
        const data = await response.json();
        const characters = data.results as Character[];
        cache.characters = characters;
        return data.results;
    } catch (error) {
        throw error;
    } finally {
        cache.isFetchingCharacters = false;
    }
}


export const getCharacter = async (id: string, refresh?: boolean): Promise<Character | undefined> => {
    if (cache.isFetchingCharacter === id) return;
    if (!refresh) {
        const target = cache.characters.find((character) => character.id === Number(id));
        if (target) return target;
    }
    try {
        cache.isFetchingCharacter = id;
        const response = await fetch(apiEndpoints.Character.replace(":id", id));
        const data = await response.json();
        const character = data as Character | undefined;
        if (!character) throw new Error("Character not found");
        cache.characters = cache.characters.filter((character) => character.id !== Number(id));
        cache.characters.push(character);
        return character;
    } catch (error) {
        throw error;
    } finally {
        cache.isFetchingCharacter = null;
    }  
}