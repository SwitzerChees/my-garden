import lfp from 'lodash/fp'
import { Plant, Tag } from '@my-garden/common/definitions'
import { executeSafe } from './utils'
import { db } from '.'
const { first, get, pipe, filter, uniqBy } = lfp

interface GetTagsParams {
  query?: string
  withDummy?: boolean
  exclude?: Tag[]
}
export const getTags = async ({ query = '', withDummy = false, exclude = [] }: GetTagsParams): Promise<Tag[]> => {
  const { result, error } = await executeSafe<Tag[]>(
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

export const getPlants = async ({ filter = '', limit = 10, start = 0 }): Promise<Plant[]> => {
  const { result, error } = await executeSafe<Plant[]>(
    db.query(
      `
      SELECT *, ->assigned->tag.* as tags, ->history->historyelement.* as history FROM type::table($tb)
      WHERE string::lowercase(name) CONTAINS $filter OR string::lowercase(botanicalName) CONTAINS $filter
      OR string::lowercase(->assigned->tag.name) CONTAINS $filter ORDER BY createdAt DESC LIMIT ${limit} START ${start}
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

export const getPlant = async (id: string): Promise<Plant | undefined> => {
  const { result, error } = await executeSafe(
    db.query(
      `
      SELECT *, ->assigned->tag.* as tags, ->history->historyelement.* as history FROM type::table($tb)
      WHERE id = $id LIMIT 1
      `,
      {
        tb: 'plant',
        id,
      }
    )
  )
  if (error) return
  return pipe(first, get('result'), first)(result)
}
