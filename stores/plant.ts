import { defineStore } from 'pinia'
import { Plant, db } from '~~/surrealdb'
import { addPlant } from '~~/surrealdb/mutations'

export const usePlantStore = defineStore('plant', () => {
  let plant = $ref<Plant>()
  let newPlant = $ref<Plant>({ id: '', name: '', botanicalName: '', tags: [] })

  const add = async () => {
    const success = await addPlant(newPlant)
    if (!success) return false
    newPlant = { id: '', name: '', botanicalName: '', tags: [] }
    return true
  }

  return $$({ add, plant, newPlant })
})
