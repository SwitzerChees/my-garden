import lfp from 'lodash/fp'
import { executeSafe } from './utils'
import { db } from '.'
import { Plant, Tag } from '~~/definitions'
const { first, get, pipe, filter, uniqBy } = lfp

interface GetTagsParams {
  query?: string
  withDummy?: boolean
  exclude?: Tag[]
}
export const getTags = async ({ query = '', withDummy = false, exclude = [] }: GetTagsParams): Promise<Tag[]> => {
  const { result, error } = await executeSafe(
    db.query('SELECT * FROM type::table($tb) WHERE string::lowercase(name) CONTAINS $filter', {
      tb: 'tag',
      filter: query?.toLowerCase() || '',
    })
  )
  if (error) return []
  const tags: Tag[] = pipe(first, get('result'))(result)
  if (withDummy && query) {
    tags.push({ name: query } as Tag)
  }
  return uniqBy((t: Tag) => t.name.trim())(filter((t: Tag) => filter((e: Tag) => e.name === t.name)(exclude).length === 0)(tags))
}

export const getPlants = async ({ filter = '' }): Promise<Plant[]> => {
  const { result, error } = await executeSafe(
    db.query(
      `
      SELECT *, ->assigned->tag.* as tags FROM type::table($tb)
      WHERE string::lowercase(name) CONTAINS $filter OR string::lowercase(botanicalName) CONTAINS $filter
      OR string::lowercase(->assigned->tag.name) CONTAINS $filter ORDER BY createdAt DESC
      `,
      {
        tb: 'plant',
        filter: filter?.toLowerCase() || '',
      }
    )
  )
  if (error) return []
  return pipe(first, get('result'))(result)
}
