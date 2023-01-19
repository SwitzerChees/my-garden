import { defineStore } from 'pinia'
import { Plant } from '~~/definitions'
import axios from 'axios'

export const usePlantsStore = defineStore('plants', () => {
  let plants = $ref<Plant[]>([])

  const fetch = async () => {
    try {
      const { data } = await axios.get<Plant[]>('/api/plants')
      plants = data
      return true
    } catch (error) {
      return false
    }
  }

  return $$({ plants, fetch })
})
