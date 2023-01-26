<template>
  <div class="flex flex-col gap-1">
    <div class="flex flex-col gap-4">
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
            :class="reminderSummary.fertilize.nextInDays < 0 ? 'text-red-400' : reminderSummary.fertilize.doneToday ? 'text-green-400' : ''"
            >{{ getReminderInDays(reminderSummary.fertilize) }}</span
          >
        </div>
        <Button v-if="plant.reminder.fertilize && !reminderSummary.fertilize.doneToday" @click="fertilizeAction">
          <Icon name="healthicons:nutrition" size="1.5rem" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Plant } from '@my-garden/common/definitions'
  import { getReminderInDays, getReminderDays, getReminderSummary } from '@my-garden/common/utils'
  const { addHistoryElement } = $(useMutations())

  const props = defineProps<{ plant: Plant }>()

  const emits = defineEmits(['watered', 'fertilized'])

  const reminderSummary = $computed(() => {
    return getReminderSummary(props.plant)
  })

  const waterAction = async () => {
    if (!props.plant.id) return
    const historyElement = await addHistoryElement(props.plant.id, { action: 'watered' })
    if (!historyElement) return
    emits('watered', historyElement)
  }

  const fertilizeAction = async () => {
    if (!props.plant.id) return
    const historyElement = await addHistoryElement(props.plant.id as any, { action: 'fertilized' })
    if (!historyElement) return
    emits('fertilized', historyElement)
  }
</script>
