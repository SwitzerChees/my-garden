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
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <div class="flex items-center gap-1">
              <span class="font-bold">Water</span>
              <span class="text-xs text-gray-400">({{ getReminderDays(plant.reminder.water) }})</span>
            </div>
            <span class="text-gray-400">{{ getReminderInDays(plant.reminder.water) }}</span>
          </div>
          <Button v-if="plant.reminder.water" @click="waterAction">
            <Icon name="mdi:watering-can" size="1.5rem" />
          </Button>
        </div>
        <div class="flex justify-between">
          <div class="flex flex-col">
            <div class="flex items-center gap-1">
              <span class="font-bold">Fertilizer</span>
              <span class="text-xs text-gray-400">({{ getReminderDays(plant.reminder.fertilize) }})</span>
            </div>
            <span class="text-gray-400">{{ getReminderInDays(plant.reminder.fertilize) }}</span>
          </div>
          <Button v-if="plant.reminder.fertilize" @click="fertilizeAction">
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
  import { photoUrl } from '~~/utils'

  const props = defineProps<{ plant: Plant }>()

  const emits = defineEmits(['watered', 'fertilized'])

  const route = useRoute()

  const getReminderDays = (days?: number) => {
    if (!days || days === 0) return 'No Reminder'
    return `every ${days} days`
  }

  const getReminderInDays = (days?: number) => {
    if (!days || days === 0) return ''
    const today = new Date()
    const reminderDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000)
    const diffInDays = Math.ceil((reminderDate.getTime() - today.getTime()) / (1000 * 3600 * 24))
    return `in ${diffInDays} days`
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
