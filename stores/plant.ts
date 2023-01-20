import { defineStore } from 'pinia'
import { Plant, db } from '~~/surrealdb'
import { addPlant } from '~~/surrealdb/mutations'

export const usePlantStore = defineStore('plant', () => {
  let dialogOpen = $ref(false)
  let showNewPlant = $ref(false)
  let plant = $ref<Plant>()
  let newPlant = $ref<Plant>({ id: '', name: '', botanicalName: '', tags: [] })

  const add = async () => {
    plant = await addPlant(newPlant)
    newPlant = { id: '', name: '', botanicalName: '', tags: [] }
    return true
  }

  return $$({ dialogOpen, showNewPlant, add, plant, newPlant })
})
