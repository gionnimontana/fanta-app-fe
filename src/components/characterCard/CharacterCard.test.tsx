import { it, expect, test } from 'vitest'
import {render, screen} from '@testing-library/react';
import { CharacterCard } from './CharacterCard';

test('CharacterCard component', () => {
  const mockCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
  };

  it('renders the character name and image', () => {
    render(
      <CharacterCard character={mockCharacter} />
    );

    const characterName = screen.getByText(mockCharacter.name);
    expect(characterName).toBe(mockCharacter.name);
  });

  it('renders the character link with the correct URL', () => {
    render(
      <CharacterCard character={mockCharacter} />
    );

    const characterLink = screen.getByRole('link');
    expect(characterLink).toHaveProperty('href', `/profile/${mockCharacter.id}`);
  });

  it('applies the correct CSS classes', () => {
    render(
      <CharacterCard character={mockCharacter} />
    );

    const container = screen.getByTestId('character-card-container');
    expect(container).toHaveProperty('container');

    const name = screen.getByTestId('character-card-name');
    expect(name).toHaveProperty('name');

    const image = screen.getByTestId('character-card-image');
    expect(image).toHaveProperty('image');

    const link = screen.getByTestId('character-card-link');
    expect(link).toHaveProperty('link');
  });
});
