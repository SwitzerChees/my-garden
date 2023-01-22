<template>
  <div class="flex flex-col gap-2 pl-4 border-l-2 border-l-green-400">
    <div v-for="(item, index) in history" :key="index" class="relative flex flex-col justify-center min-h-[2rem]">
      <div class="absolute top-0 bottom-0 flex flex-col justify-center left-[-2.05rem]">
        <Icon :name="actionToIcon(item.action)" size="2rem" class="p-2 text-green-400 rounded-full bg-slate-900" />
      </div>
      <div class="flex flex-col gap-2 pl-4">
        <div class="flex items-center gap-2">
          <Icon name="material-symbols:date-range" size="1.2rem" />
          <span>{{ formatDate(item.createdAt) }}</span>
          <span class="text-xs text-gray-400">({{ capitalizeFirstLetter(item.action) }})</span>
        </div>
        <nuxt-img v-if="item.photo" :src="photoUrl(item.photo)" width="256px" height="256px" class="object-cover w-32 h-32 rounded-xl" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { HistoryElement } from '~~/definitions'
  import { formatDate, photoUrl } from '~~/utils'

  const actionToIcon = (action?: string) => {
    if (action === 'added') return 'material-symbols:add-circle-rounded'
    if (action === 'updated') return 'ic:round-mode-edit'
    if (action === 'watered') return 'mdi:watering-can'
    if (action === 'fertilized') return 'healthicons:nutrition'
    if (action === 'repotted') return 'material-symbols:potted-plant-outline'
    if (action === 'pruned') return 'fontisto:scissors'
    if (action === 'image') return 'material-symbols:photo-camera'
    return 'material-symbols:question-mark'
  }

  const capitalizeFirstLetter = (action?: string) => {
    if (!action) return ''
    return action.charAt(0).toUpperCase() + action.slice(1)
  }

  defineProps<{ history: HistoryElement[] }>()
</script>
