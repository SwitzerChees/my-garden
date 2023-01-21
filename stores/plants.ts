import { defineStore } from 'pinia'
import { Plant } from '~~/surrealdb'
import { getPlants } from '~~/surrealdb/queries'

export const usePlantsStore = defineStore('plants', () => {
  let plants = $ref<Plant[]>([])

  const fetch = async (filter?: string) => {
    plants = await getPlants({ filter })
  }

  return $$({ plants, fetch })
})
