import { defineStore } from 'pinia'
import axios from 'axios'
import { Plant } from '~~/definitions'

export const usePlantStore = defineStore('plant', () => {
  let dialogOpen = $ref(false)
  let showNewPlant = $ref(false)
  let name = $ref('')
  let botanicalName = $ref('')
  let plant = $ref<Plant>()

  const add = async () => {
    try {
      const { data } = await axios.post<Plant>('/api/plants', {
        name,
        botanicalName,
      })
      name = ''
      botanicalName = ''
      dialogOpen = false
      plant = data
      return true
    } catch (error) {
      return false
    }
  }

  return $$({ dialogOpen, showNewPlant, name, botanicalName, add, plant })
})
