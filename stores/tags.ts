import { defineStore } from 'pinia'
import { Tag, db } from '~~/surrealdb'
import lfp from 'lodash/fp'
const { first, get, pipe, find } = lfp

export const useTagsStore = defineStore('tags', () => {
  let tags = $ref<Tag[]>([])

  const fetch = async (filter?: string) => {
    try {
      const queryResult = await db.query('SELECT * FROM type::table($tb) WHERE name CONTAINS $filter', {
        tb: 'tag',
        filter: filter || '',
      })
      console.log(queryResult)
      const tagResults = pipe(first, get('result'))(queryResult)
      if (!tagResults.length && filter) {
        tags = [{ name: filter } as Tag]
        return tags
      }
      tags = tagResults
    } catch (error) {}
    return tags
  }

  const getOrAddTags = async (newTags: Tag[]) => {
    const allTags = await fetch()
    const existingTags: Tag[] = []
    try {
      for (const tag of newTags) {
        const existingTag = find({ name: tag.name })(allTags)
        if (existingTag) {
          existingTags.push(existingTag)
          continue
        }
        const tagResult = await db.create('tag', tag as any)
      }
    } catch (error) {
      console.log(error)
    }
    return existingTags
  }
  return $$({ tags, fetch, getOrAddTags })
})
