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
        <div class="flex items-start justify-between h-12">
          <div class="flex flex-col">
            <div class="flex items-center gap-1">
              <span class="font-bold">Water</span>
              <span class="text-xs text-gray-400">({{ getReminderDays(plant.reminder.water) }})</span>
            </div>
            <span
              class="text-gray-400"
              :class="reminderSummary.water.nextInDays < 0 ? 'text-red-400' : reminderSummary.water.doneToday ? 'text-green-400' : ''"
              >{{ getReminderInDays(reminderSummary.water) }}</span
            >
          </div>
          <Button v-if="plant.reminder.water && !reminderSummary.water.doneToday" @click="waterAction">
            <Icon name="mdi:watering-can" size="1.5rem" />
          </Button>
        </div>
        <div class="flex items-start justify-between h-12">
          <div class="flex flex-col">
            <div class="flex items-center gap-1">
              <span class="font-bold">Fertilizer</span>
              <span class="text-xs text-gray-400">({{ getReminderDays(plant.reminder.fertilize) }})</span>
            </div>
            <span
              class="text-gray-400"
              :class="
                reminderSummary.fertilize.nextInDays < 0 ? 'text-red-400' : reminderSummary.fertilize.doneToday ? 'text-green-400' : ''
              "
              >{{ getReminderInDays(reminderSummary.fertilize) }}</span
            >
          </div>
          <Button v-if="plant.reminder.fertilize && !reminderSummary.fertilize.doneToday" @click="fertilizeAction">
            <Icon name="healthicons:nutrition" size="1.5rem" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Plant } from '~~/definitions'
  import { addHistoryElement } from '~~/surrealdb/mutations'
  import { photoUrl, getReminderDays, getReminderInDays } from '~~/utils'

  const props = defineProps<{ plant: Plant }>()

  const emits = defineEmits(['watered', 'fertilized'])

  const route = useRoute()

  const reminderSummary = $computed(() => {
    return getReminderSummary(props.plant)
  })

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
