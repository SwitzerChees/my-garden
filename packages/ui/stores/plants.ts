import { defineStore } from 'pinia'
import { Plant } from '~~/../common/definitions'

export const usePlantsStore = defineStore('plants', () => {
  const plants = $ref<Plant[]>([])
  const selectedPlantId = $ref<number>()

  return $$({ plants, selectedPlantId })
})
