import { defineStore } from 'pinia'
import lfp from 'lodash/fp'
import { Plant, db } from '~~/surrealdb'
const { first, get, pipe } = lfp

export const usePlantsStore = defineStore('plants', () => {
  let plants = $ref<Plant[]>([])

  const fetch = async () => {
    try {
      const queryResult = await db.query('SELECT id, name, botanicalName, ->assigned->tag.* as tags FROM type::table($tb)', {
        tb: 'plant',
      })
      plants = pipe(first, get('result'))(queryResult)
      return true
    } catch (error) {
      return false
    }
  }

  return $$({ plants, fetch })
})
