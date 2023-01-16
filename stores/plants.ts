import { defineStore } from 'pinia'

export const usePlantsStore = defineStore('plants', () => {
  let detailsOpen = $ref(false)

  return $$({ detailsOpen })
})
