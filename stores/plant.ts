import { defineStore } from 'pinia'
import axios from 'axios'
import { Plant, db } from '~~/surrealdb'

export const usePlantStore = defineStore('plant', () => {
  let dialogOpen = $ref(false)
  let showNewPlant = $ref(false)
  let name = $ref('')
  let botanicalName = $ref('')
  let plant = $ref<Plant>()

  const add = async () => {
    try {
      const newPlant = await db.create('plant', {
        name,
        botanicalName,
      })
      plant = newPlant
      return true
    } catch (error) {
      return false
    }
  }

  return $$({ dialogOpen, showNewPlant, name, botanicalName, add, plant })
})
