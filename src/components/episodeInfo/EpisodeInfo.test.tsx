import { test, expect, it } from 'vitest';
import { Episode } from '../../types/episodes';
import { EpisodeInfo } from './EpisodeInfo';
import { render } from '@testing-library/react';

test('EpisodeInfo component', test => {
  const episodes: Episode[] = [
    {
      id: 1,
      name: 'Pilot',
      air_date: 'December 2, 2013',
      episode: 'S01E01',
      characters: ['https://rickandmortyapi.com/api/character/1', 'https://rickandmortyapi.com/api/character/2'],
      url: 'https://rickandmortyapi.com/api/episode/1',
      created: '2017-11-10T12:56:33.798Z',
    },
    {
      id: 2,
      name: 'Lawnmower Dog',
      air_date: 'December 9, 2013',
      episode: 'S01E02',
      characters: ['https://rickandmortyapi.com/api/character/1', 'https://rickandmortyapi.com/api/character/2'],
      url: 'https://rickandmortyapi.com/api/episode/2',
      created: '2017-11-10T12:56:33.916Z',
    },
  ];

  it('renders a list of episode names', async () => {
    const wrapper = render(<EpisodeInfo episodes={episodes} />);
    const episodeNames = await wrapper.findAllByText('.infoTitle');
    expect(episodeNames).toBeDefined();
    expect(episodeNames.length).toBe(2);
  });
});
