<template>
  <div class="flex flex-col gap-2">
    <div></div>
    <div class="flex flex-col gap-6 grow md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <PlantCard
        v-for="plant of plants"
        :key="plant.id"
        :plant="plant"
        @watered="addHistory(plant, $event)"
        @fertilized="addHistory(plant, $event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { HistoryElement, Plant } from '~~/definitions'
  import { getPlants } from '~~/surrealdb/queries'

  const addHistory = (plant: Plant, historyElement: HistoryElement) => {
    plant.history.push(historyElement)
  }

  let plants = $ref<Plant[]>([])
  onMounted(async () => {
    plants = await getPlants({ filter: '' })
  })
</script>
