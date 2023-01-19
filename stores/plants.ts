import { defineStore } from 'pinia'
import { Plant } from '~~/definitions'
import axios from 'axios'

export const usePlantsStore = defineStore('plants', () => {
  const plants = $ref<Plant[]>([])

  // const { fetch, fetchState } = useFetch(async () => {

  // }))

  return $$({ plants })
})
