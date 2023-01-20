import { defineStore } from 'pinia'
import { Plant, db } from '~~/surrealdb'
import { addPlant } from '~~/surrealdb/mutations'

export const usePlantStore = defineStore('plant', () => {
  let selectedPlant = $ref<Plant>()
  let newPlant = $ref<Plant>({ id: '', name: '', botanicalName: '', tags: [] })

  const add = async () => {
    const addedPlant = await addPlant(newPlant)
    if (!addedPlant) return false
    newPlant = { id: '', name: '', botanicalName: '', tags: [] }
    return addedPlant
  }

  return $$({ add, selectedPlant, newPlant })
})
