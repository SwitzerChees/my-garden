import { defineStore } from 'pinia'
import axios from 'axios'
import { Plant, db } from '~~/surrealdb'
import { useTagsStore } from './tags'

export const usePlantStore = defineStore('plant', () => {
  let dialogOpen = $ref(false)
  let showNewPlant = $ref(false)
  let plant = $ref<Plant>()
  let newPlant = $ref<Plant>({ id: '', name: '', botanicalName: '', tags: [] })
  const { getOrAddTags } = useTagsStore()

  const add = async () => {
    try {
      const tags = await getOrAddTags(newPlant.tags)
      const plantResult = await db.create('plant', {
        name: newPlant.name,
        botanicalName: newPlant.botanicalName,
      })
      for (const tag of tags) {
        db.query(`RELATE ${plantResult.id}->assigned->${tag.id}`)
      }
      newPlant = { id: '', name: '', botanicalName: '', tags: [] }
      plant = plantResult as Plant
      return true
    } catch (error) {
      return false
    }
  }

  return $$({ dialogOpen, showNewPlant, add, plant, newPlant })
})
