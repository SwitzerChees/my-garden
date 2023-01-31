<template>
  <div class="relative flex flex-col gap-2">
    <div
      class="fixed lg:pl-40 left-0 right-0 z-50 flex justify-center p-6 pb-5 m-auto md:max-w-sm lg:max-w-xl md:pb-3 md:p-4 md:justify-center top-0 bg-slate-900">
      <span class="p-input-icon-left grow">
        <i class="pi pi-search" />
        <InputText v-model="searchQuery" type="text" placeholder="Search" class="w-full" @input="debouncedFilterPlants" />
      </span>
      <Button v-if="searchQuery" class="p-button-text" @click="cleanFilter">
        <Icon name="material-symbols:close-rounded" size="1.5rem" />
      </Button>
      <Button class="p-button-text" :class="groupPlants ? 'p-button-success' : ''" @click="groupPlants = !groupPlants">
        <Icon name="uis:layer-group" size="1.5rem" />
        <Transition
          enter-active-class="animate__animated animate__backInRight animate__fast"
          leave-active-class="animate__animated animate__backOutRight animate__fast">
          <Icon v-if="groupPlants" name="ic:sharp-radio-button-checked" size="0.9rem" class="absolute top-2 right-2" />
        </Transition>
        <Transition
          enter-active-class="animate__animated animate__backInRight animate__fast"
          leave-active-class="animate__animated animate__backOutRight animate__fast">
          <Icon v-if="!groupPlants" name="ic:sharp-radio-button-unchecked" size="0.9rem" class="absolute top-2 right-2" />
        </Transition>
      </Button>
    </div>
    <div class="absolute flex top-[5rem] md:-top-4 p-2 right-0 left-0 justify-center">
      <span class="text-green-500 font-bold">{{ filteredAndOrderedPlants.length }} Plants</span>
    </div>
    <div v-if="!groupPlants" class="flex flex-col gap-6 pt-[7.5rem] md:pt-6 grow md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <PlantCard
        v-for="plant of filteredAndOrderedPlants"
        :id="`plant-${plant.id}`"
        :key="plant.id"
        :plant="plant"
        @watered="addHistory(plant, $event)"
        @fertilized="addHistory(plant, $event)" />
    </div>
    <Accordion v-else v-model:active-index="activePlantGroup" class="pt-[7.5rem] md:pt-6" lazy multiple @tab-open="debouncedSafeState">
      <AccordionTab v-for="plantGroup in plantGroups" :key="plantGroup.key" :header="`${plantGroup.key}`">
        <div class="flex flex-col gap-6 pt-3 md:pt-6 grow md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <PlantCard
            v-for="plant of plantGroup.plants"
            :id="`plant-${plant.id}`"
            :key="plant.id"
            :plant="plant"
            @watered="addHistory(plant, $event)"
            @fertilized="addHistory(plant, $event)" />
        </div>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script setup lang="ts">
  import lfp from 'lodash/fp'
  import { HistoryElement, Plant } from '@my-garden/common/definitions'
  import { getReminderSummary, getPlantsGroupedByReminder } from '@my-garden/common/utils'
  import { usePlantsStore } from '../../stores/plants'
  const { getPlants } = $(useQueries())
  const { debounce, orderBy } = lfp
  let { plants } = $(usePlantsStore())
  const { selectedPlantId } = $(usePlantsStore())

  let searchQuery = $ref('')
  let groupPlants = $ref(false)
  let activePlantGroup = $ref([0])

  const plantGroups = $computed(() => getPlantsGroupedByReminder(plants))

  const filteredAndOrderedPlants = $computed(() => {
    const orderByReminderDays = orderBy<Plant>(
      (p: Plant) => {
        const reminderSummary = getReminderSummary(p)
        if (reminderSummary.water.nextInDays < 0 || reminderSummary.fertilize.nextInDays < 0) return -1
        let sortValue = 999
        if (reminderSummary.water.days > 0) {
          sortValue = reminderSummary.water.nextInDays
        }
        if (reminderSummary.fertilize.days > 0 && reminderSummary.fertilize.nextInDays < sortValue) {
          sortValue = reminderSummary.fertilize.nextInDays
        }
        return sortValue
      },
      ['asc']
    )
    return orderByReminderDays(plants)
  })

  const addHistory = (plant: Plant, historyElement: HistoryElement) => {
    plant.history.push(historyElement)
  }

  const debouncedFilterPlants = debounce(400, async () => {
    plants = await getPlants({ filter: searchQuery })
  })

  const cleanFilter = async () => {
    searchQuery = ''
    plants = await getPlants({ filter: searchQuery })
  }

  const scrollToSelectedPlant = (count: number) => {
    if (!selectedPlantId || count >= 10) return
    const plantElement = document.getElementById(`plant-${selectedPlantId}`)
    if (!plantElement) {
      return setTimeout(() => scrollToSelectedPlant(count + 1), 100)
    }
    plantElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  onMounted(async () => {
    const filterState = sessionStorage.getItem('filter') ? JSON.parse(sessionStorage.getItem('filter') as string) : undefined
    if (filterState) {
      searchQuery = filterState.searchQuery
      groupPlants = filterState.groupPlants
      activePlantGroup = filterState.activePlantGroup
    }
    plants = await getPlants({ filter: searchQuery })
    if (!plants.find((p) => p.id === selectedPlantId)) return
    scrollToSelectedPlant(0)
  })

  const debouncedSafeState = debounce(200, () => {
    sessionStorage.setItem('filter', JSON.stringify({ searchQuery, groupPlants, activePlantGroup }))
  })
  watch(() => [searchQuery, groupPlants, activePlantGroup], debouncedSafeState)
</script>
