import { defineStore } from 'pinia'
import { Tag } from '~~/surrealdb'
import { getTags } from '~~/surrealdb/queries'

export const useTagsStore = defineStore('tags', () => {
  let tags = $ref<Tag[]>([])

  const fetch = async (filter?: string) => {
    tags = await getTags({ filter, withDummy: true })
  }

  return $$({ tags, fetch })
})
