import { it, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react';
import { CharacterProfile } from './CharacterProfile';
import { Character } from '../../types/characters/index'

test('CharacterProfile component', () => {
  const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    type: 'x',
    origin: {
      name: 'x',
      url: 'x',
    },
    location: {
      name: 'x',
      url: 'x',
    },
    episode: ['1', '2', '3'],
    url: 'x',
    created: 'x'
  };

  it('renders the character name and image', () => {
    render(<CharacterProfile character={mockCharacter} />);

    const characterName = screen.getByText(mockCharacter.name);
    expect(characterName).toBeDefined();

    const characterImage = screen.getByAltText(mockCharacter.name);
    expect(characterImage).toBeDefined();
    expect(characterImage).toHaveProperty('src', mockCharacter.image);
  });

  it('renders the character information', () => {
    render(<CharacterProfile character={mockCharacter} />);

    const statusTitle = screen.getByText('Status:');
    expect(statusTitle).toBeDefined();
    const statusValue = screen.getByText(mockCharacter.status);
    expect(statusValue).toBeDefined();

    const speciesTitle = screen.getByText('Species:');
    expect(speciesTitle).toBeDefined();
    const speciesValue = screen.getByText(mockCharacter.species);
    expect(speciesValue).toBeDefined();

    const genderTitle = screen.getByText('Gender:');
    expect(genderTitle).toBeDefined();
    const genderValue = screen.getByText(mockCharacter.gender);
    expect(genderValue).toBeDefined();
  });

  it('renders the children components', () => {
    const mockChild = <div>Test child component</div>;

    render(
      <CharacterProfile character={mockCharacter}>
        {mockChild}
      </CharacterProfile>
    );

    const childComponent = screen.getByText('Test child component');
    expect(childComponent).toBeDefined();
  });

  it('applies the correct CSS classes', () => {
    render(<CharacterProfile character={mockCharacter} />);

    const infoDuple = screen.getAllByTestId('character-profile-info-duple');
    expect(infoDuple).toHaveLength(3);

    const infoTitle = screen.getAllByTestId('character-profile-info-title');
    expect(infoTitle).toHaveLength(3);

    const infoValue = screen.getAllByTestId('character-profile-info-value');
    expect(infoValue).toHaveLength(3);
  });
});
