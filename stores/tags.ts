import { defineStore } from 'pinia'
import { Tag, db } from '~~/surrealdb'
import lfp from 'lodash/fp'
import { getTags } from '~~/surrealdb/queries'
const { first, get, pipe, find, filter } = lfp

export const useTagsStore = defineStore('tags', () => {
  let tags = $ref<Tag[]>([])

  const fetch = async (filter?: string) => {
    tags = await getTags({ filter, withDummy: true })
  }

  return $$({ tags, fetch })
})
