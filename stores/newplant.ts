import { defineStore } from 'pinia'

export const useNewPlantStore = defineStore('newplant', () => {
  const dialogOpen = $ref(false)
  const name = $ref('')
  const botanicalName = $ref('')

  return $$({ dialogOpen, name, botanicalName })
})
