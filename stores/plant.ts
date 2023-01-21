import { defineStore } from 'pinia'
import { Plant } from '~~/surrealdb'
import { addPlant } from '~~/surrealdb/mutations'

export const usePlantStore = defineStore('plant', () => {
  const selectedPlant = $ref<Plant>()
  let newPlant = $ref<Plant>({ id: '', name: '', botanicalName: '', tags: [] })

  const add = async () => {
    const addedPlant = await addPlant(newPlant)
    if (!addedPlant) return false
    newPlant = { id: '', name: '', botanicalName: '', tags: [] }
    return addedPlant
  }

  return $$({ add, selectedPlant, newPlant })
})
