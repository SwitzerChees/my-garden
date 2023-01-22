<template>
  <div class="flex flex-col gap-2">
    <div
      class="fixed left-0 right-0 z-50 flex justify-between p-6 pb-5 m-auto md:max-w-sm lg:max-w-xl md:pb-3 md:p-4 md:justify-center top-20 md:top-0 bg-slate-800 md:bg-slate-900">
      <span class="p-input-icon-left grow">
        <i class="pi pi-search" />
        <InputText v-model="filter" type="text" placeholder="Search" class="w-full" @input="debouncedFilterPlants" />
      </span>
      <Button class="p-button-text">
        <Icon name="ic:baseline-filter-alt" size="1.5rem" />
      </Button>
    </div>
    <div class="flex flex-col gap-6 pt-20 md:pt-2 grow md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <PlantCard
        v-for="plant of plants"
        :key="plant.id"
        :plant="plant"
        @watered="addHistory(plant, $event)"
        @fertilized="addHistory(plant, $event)" />
    </div>
    <ProgressSpinner ref="loadNewData" />
  </div>
</template>

<script setup lang="ts">
  import lfp from 'lodash/fp'
  import { HistoryElement, Plant } from '~~/definitions'
  import { getPlants } from '~~/surrealdb/queries'
  const { debounce } = lfp

  const filter = $ref('')

  const addHistory = (plant: Plant, historyElement: HistoryElement) => {
    plant.history.push(historyElement)
  }

  let plants = $ref<Plant[]>([])
  const debouncedFilterPlants = debounce(400, async () => {
    plants = await getPlants({ filter })
  })
  const loadNewData = $ref()
  onMounted(async () => {
    plants = await getPlants({ filter })
    const options = {
      root: null,
      threshold: 0.5,
    }
    const observer = new IntersectionObserver((entries) => {
      console.log(entries[0].isIntersecting)
      if (entries[0].isIntersecting) {
        debouncedFilterPlants()
      }
    }, options)
  })
</script>
