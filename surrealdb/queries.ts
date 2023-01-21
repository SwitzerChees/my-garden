import lfp from 'lodash/fp'
import { executeSafe } from './utils'
import { db } from '.'
import { Plant, Tag } from '~~/definitions'
const { first, get, pipe } = lfp

export const getTags = async ({ filter = '', withDummy = false }): Promise<Tag[]> => {
  const { result, error } = await executeSafe(
    db.query('SELECT * FROM type::table($tb) WHERE string::lowercase(name) CONTAINS $filter', {
      tb: 'tag',
      filter: filter?.toLowerCase() || '',
    })
  )
  if (error) return []
  const tags = pipe(first, get('result'))(result)
  if (withDummy && filter && !tags.length) {
    return [{ name: filter } as Tag]
  }
  return tags
}

export const getPlants = async ({ filter = '' }): Promise<Plant[]> => {
  const { result, error } = await executeSafe(
    db.query(
      `
      SELECT *, ->assigned->tag.* as tags FROM type::table($tb)
      WHERE string::lowercase(name) CONTAINS $filter OR string::lowercase(botanicalName) CONTAINS $filter
      OR string::lowercase(->assigned->tag.name) CONTAINS $filter
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
