import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', () => {
  const showNewPlantDialog = $ref(false)

  let showNewPlantButton = $ref(false)
  const route = useRoute()
  const checkShowNewPlantButton = () => {
    showNewPlantButton = route.path === '/my-plants'
  }
  checkShowNewPlantButton()
  watch(route, checkShowNewPlantButton)

  return $$({ showNewPlantButton, showNewPlantDialog })
})
