export interface CharacterMinData {
  id: number;
  name: string;
  image: string;
}

export interface Character extends CharacterMinData {
    status: 'Alive' | 'Dead' | 'unknown';
    species: string;
    type: string;
    gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
    origin: {
      name: string;
      url: string;
    };
    location: {
      name: string;
      url: string;
    };
    episode: string[];
    url: string;
    created: string;
}