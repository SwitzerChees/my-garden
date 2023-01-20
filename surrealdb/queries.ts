import lfp from 'lodash/fp'
const { first, get, pipe, filter, find } = lfp
import { Tag } from './models'
import { db } from '.'
import { executeSafe } from './utils'

export const getTags = async ({ filter = '', withDummy = false }): Promise<Tag[]> => {
  const { result, error } = await executeSafe(
    db.query('SELECT * FROM type::table($tb) WHERE name CONTAINS $filter', {
      tb: 'tag',
      filter: filter || '',
    })
  )
  if (error) return []
  const tags = pipe(first, get('result'))(result)
  if (withDummy && filter && !tags.length) {
    return [{ name: filter } as Tag]
  }
  return tags
}
