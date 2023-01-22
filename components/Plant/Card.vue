<template>
  <div class="flex flex-col justify-between gap-1 bg-gray-900 rounded-xl">
    <div class="flex gap-2 px-4 pt-3 pb-2 cursor-pointer" @click="showPlant(plant.id)">
      <nuxt-img :src="photoUrl(plant?.photo)" width="128px" height="128px" class="object-cover h-14 w-14 rounded-xl" />
      <div class="flex flex-col justify-between overflow-hidden grow">
        <div class="flex flex-col gap-0.5">
          <h2 class="text-sm font-bold truncate">{{ plant?.name }}</h2>
        </div>
        <div class="flex flex-wrap gap-2 pt-2">
          <Tag v-for="tag of plant?.tags" :key="tag.id" severity="success">
            <span class="text-xs">{{ tag.name }}</span>
          </Tag>
        </div>
      </div>
      <div>
        <Button class="p-button-text">
          <Icon name="ic:baseline-remove-red-eye" size="1.5rem" />
        </Button>
      </div>
    </div>
    <div class="flex flex-col gap-1">
      <div class="border-t border-gray-700"></div>
      <div class="flex flex-col gap-4 p-4">
        <div class="flex items-start justify-between">
          <div class="flex flex-col">
            <div class="flex items-center gap-1">
              <span class="font-bold">Water</span>
              <span class="text-xs text-gray-400">({{ getReminderDays(plant.reminder.water) }})</span>
            </div>
            <span class="text-gray-400">{{ getReminderInDays(nextWaterInDays, plant.reminder.water) }}</span>
          </div>
          <Button v-if="plant.reminder.water && !doneToday(nextWaterInDays, plant.reminder.water)" @click="waterAction">
            <Icon name="mdi:watering-can" size="1.5rem" />
          </Button>
        </div>
        <div class="flex items-start justify-between">
          <div class="flex flex-col">
            <div class="flex items-center gap-1">
              <span class="font-bold">Fertilizer</span>
              <span class="text-xs text-gray-400">({{ getReminderDays(plant.reminder.fertilize) }})</span>
            </div>
            <span class="text-gray-400">{{ getReminderInDays(nextFertilizeInDays, plant.reminder.fertilize) }}</span>
          </div>
          <Button v-if="plant.reminder.fertilize && !doneToday(nextFertilizeInDays, plant.reminder.fertilize)" @click="fertilizeAction">
            <Icon name="healthicons:nutrition" size="1.5rem" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import lfp from 'lodash/fp'
  import { HistoryElement, Plant } from '~~/definitions'
  import { addHistoryElement } from '~~/surrealdb/mutations'
  import { photoUrl } from '~~/utils'
  const { first, orderBy, pipe } = lfp

  const props = defineProps<{ plant: Plant }>()

  const emits = defineEmits(['watered', 'fertilized'])

  const route = useRoute()

  const getReminderDays = (days?: number) => {
    if (!days || days === 0) return 'No Reminder'
    return `every ${days} days`
  }

  const waterActionTypes = ['added', 'watered', 'repotted']
  const fertilizeActionTypes = ['added', 'fertilized', 'repotted']

  const mostRecentWaterAction = $computed(() => {
    if (!props.plant.history || props.plant.history.length === 0) return
    const waterActions = props.plant.history.filter((h) => waterActionTypes.includes(h.action)) as HistoryElement[]
    if (waterActions.length === 0) return
    return pipe(orderBy('createdAt', 'desc'), first)(waterActions) as HistoryElement
  })

  const mostRecentFertilizeAction = $computed(() => {
    if (!props.plant.history || props.plant.history.length === 0) return
    const fertilizeActions = props.plant.history.filter((h) => fertilizeActionTypes.includes(h.action)) as HistoryElement[]
    if (fertilizeActions.length === 0) return
    return pipe(orderBy('createdAt', 'desc'), first)(fertilizeActions) as HistoryElement
  })

  const nextWaterInDays = computed(() => {
    if (!props.plant.reminder.water || !mostRecentWaterAction) return
    const today = new Date()
    const diffInDays = Math.ceil(
      (new Date(mostRecentWaterAction.createdAt).getTime() + props.plant.reminder.water * 24 * 60 * 60 * 1000 - today.getTime()) /
        (1000 * 3600 * 24)
    )
    return diffInDays
  })

  const nextFertilizeInDays = computed(() => {
    if (!props.plant.reminder.fertilize || !mostRecentFertilizeAction) return
    const today = new Date()
    const diffInDays = Math.ceil(
      (new Date(mostRecentFertilizeAction.createdAt).getTime() + props.plant.reminder.fertilize * 24 * 60 * 60 * 1000 - today.getTime()) /
        (1000 * 3600 * 24)
    )
    return diffInDays
  })

  const doneToday = (daysNext?: number, daysInterval?: number) => {
    if (!daysNext || !daysInterval) return false
    return daysNext === daysInterval
  }

  const getReminderInDays = (daysNext?: number, daysInterval?: number) => {
    if (!daysNext || !daysInterval) return ''
    if (doneToday(daysNext, daysInterval)) return 'Done Today'
    return `in ${daysNext} days`
  }

  const waterAction = async () => {
    const historyElement = await addHistoryElement(props.plant.id, { action: 'watered', createdAt: new Date() })
    if (!historyElement) return
    emits('watered', historyElement)
  }

  const fertilizeAction = async () => {
    const historyElement = await addHistoryElement(props.plant.id, { action: 'fertilized', createdAt: new Date() })
    if (!historyElement) return
    emits('fertilized', historyElement)
  }

  const showPlant = (id: string) => {
    if (route.path === `/my-plants/${id}`) return
    navigateTo(`/my-plants/${id}`)
  }
</script>
