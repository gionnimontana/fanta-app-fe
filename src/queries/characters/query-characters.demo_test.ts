// this is how I would test my queries, unfortunately react-hooks-testing-library don't support React 18 yet

import { renderHook } from 'react-hooks-testing-library'
import { expect, test } from 'vitest'
import { useCharacters, useCharacter } from './index'

test('useCharacters', () => {
  test('fetches and returns characters data', async () => {
    const pageId = 1
    const { result, waitFor } = renderHook(() => useCharacters(pageId))

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data).toEqual({
      info: { pages: expect.any(Number) },
      results: expect.arrayContaining([
        {
          id: expect.any(Number),
          name: expect.any(String),
          status: expect.any(String),
          species: expect.any(String),
          gender: expect.any(String),
          origin: expect.objectContaining({
            name: expect.any(String),
            url: expect.any(String),
          }),
          location: expect.objectContaining({
            name: expect.any(String),
            url: expect.any(String),
          }),
          image: expect.any(String),
          episode: expect.arrayContaining([expect.any(String)]),
          url: expect.any(String),
          created: expect.any(String),
        },
      ]),
    })
  })
})

test('useCharacter', () => {
  test('fetches and returns character data', async () => {
    const id = 1
    const { result, waitFor } = renderHook(() => useCharacter(id))

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      status: expect.any(String),
      species: expect.any(String),
      gender: expect.any(String),
      origin: expect.objectContaining({
        name: expect.any(String),
        url: expect.any(String),
      }),
      location: expect.objectContaining({
        name: expect.any(String),
        url: expect.any(String),
      }),
      image: expect.any(String),
      episode: expect.arrayContaining([expect.any(String)]),
      url: expect.any(String),
      created: expect.any(String),
    })
  })
})
