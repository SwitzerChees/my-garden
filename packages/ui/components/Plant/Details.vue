<template>
  <div class="flex flex-col justify-between gap-1 p-6 bg-gray-900 rounded-xl">
    <nuxt-img :src="photoUrl(plant?.photo)" width="256px" height="256px" class="object-cover w-40 h-40 rounded-xl place-self-center" />
    <h2 class="pt-1 font-bold truncate place-self-center">{{ plant?.name }}</h2>
    <h3 v-if="plant?.botanicalName" class="text-gray-400 truncate place-self-center">{{ plant?.botanicalName }}</h3>
    <div class="flex flex-wrap gap-2 pt-1 place-self-center">
      <Tag v-for="tag of plant?.tags" :key="tag.id" severity="success">
        <span>{{ tag.name }}</span>
      </Tag>
    </div>
    <div class="mt-4 border-t border-gray-700"></div>
    <PlantReminder :plant="plant" class="pt-4" @watered="addHistory(plant, $event)" @fertilized="addHistory(plant, $event)" />
  </div>
</template>

<script setup lang="ts">
  import { HistoryElement, Plant } from '@my-garden/common/definitions'
  import { photoUrl } from '~~/utils'

  defineProps<{ plant: Plant }>()

  const addHistory = (plant: Plant, historyElement: HistoryElement) => {
    plant.history.push(historyElement)
  }
</script>
