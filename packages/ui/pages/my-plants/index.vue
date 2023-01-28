<template>
  <div class="relative flex flex-col gap-2">
    <div
      class="fixed left-0 right-0 z-50 flex justify-between p-6 pb-5 m-auto md:max-w-sm lg:max-w-xl md:pb-3 md:p-4 md:justify-center top-0 bg-slate-900">
      <span class="p-input-icon-left grow">
        <i class="pi pi-search" />
        <InputText v-model="filter" type="text" placeholder="Search" class="w-full" @input="debouncedFilterPlants" />
      </span>
      <Button class="p-button-text" :class="filterReminder ? 'p-button-success' : ''" @click="filterReminder = !filterReminder">
        <Icon name="carbon:reminder" size="1.5rem" />
        <Transition
          enter-active-class="animate__animated animate__backInRight animate__fast"
          leave-active-class="animate__animated animate__backOutRight animate__fast">
          <Icon v-if="filterReminder" name="ic:baseline-filter-alt" size="0.9rem" class="absolute top-2 right-2" />
        </Transition>
        <Transition
          enter-active-class="animate__animated animate__backInRight animate__fast"
          leave-active-class="animate__animated animate__backOutRight animate__fast">
          <Icon v-if="!filterReminder" name="ic:baseline-filter-alt-off" size="0.9rem" class="absolute top-2 right-2" />
        </Transition>
      </Button>
    </div>
    <div class="flex flex-col gap-6 pt-24 md:pt-2 grow md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <PlantCard
        v-for="plant of filteredPlants"
        :key="plant.id"
        :plant="plant"
        @watered="addHistory(plant, $event)"
        @fertilized="addHistory(plant, $event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import lfp from 'lodash/fp'
  import { HistoryElement, Plant } from '@my-garden/common/definitions'
  import { getReminderSummary, needReminderAttention } from '@my-garden/common/utils'
  const { getPlants } = $(useQueries())
  const { debounce } = lfp

  let filter = $ref('')
  let filterReminder = $ref(false)

  const filteredPlants = $computed(() => {
    if (!filterReminder) return plants
    return plants.filter((p) => {
      const reminderSummary = getReminderSummary(p)
      if (needReminderAttention(reminderSummary.water) || needReminderAttention(reminderSummary.fertilize)) return true
      return false
    })
  })

  const addHistory = (plant: Plant, historyElement: HistoryElement) => {
    plant.history.push(historyElement)
  }

  let plants = $ref<Plant[]>([])
  const debouncedFilterPlants = debounce(400, async () => {
    plants = await getPlants({ filter })
  })

  onMounted(async () => {
    const filterState = sessionStorage.getItem('filter') ? JSON.parse(sessionStorage.getItem('filter') as string) : undefined
    if (filterState) {
      filter = filterState.filter
      filterReminder = filterState.filterReminder
    }
    plants = await getPlants({ filter })
  })

  const debouncedSafeState = debounce(200, () => {
    sessionStorage.setItem('filter', JSON.stringify({ filter, filterReminder }))
  })
  watch(() => [filter, filterReminder], debouncedSafeState)
</script>
