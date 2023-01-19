<template>
  <div class="flex flex-col gap-1 bg-gray-900 rounded-xl">
    <div class="flex px-4 pt-3 gap-2">
      <nuxt-img src="/uploads/2023011517364_51302.jpg" width="128px" height="128px" class="object-cover h-14 w-14 rounded-xl" />
      <div class="flex flex-col overflow-hidden grow">
        <h2 class="font-bold truncate text-sm">{{ plant?.name }}</h2>
        <h3 v-if="plant?.botanicalName" class="text-xs truncate text-gray-400">{{ plant?.botanicalName }}</h3>
      </div>
      <Button class="p-button-text" @click="showPlant">
        <Icon name="lucide:more-horizontal" size="1.5rem" />
      </Button>
    </div>
    <div class="flex gap-2 p-4 py-2 flex-wrap">
      <Tag value="Alocasia" severity="success"></Tag>
    </div>
    <div class="border-t border-gray-700"></div>
    <div class="flex flex-col gap-4 p-4">
      <div class="flex justify-between items-center">
        <div class="flex flex-col">
          <div class="flex gap-1 items-center">
            <span class="font-bold">Water</span>
            <span class="text-gray-400 text-xs">(every 14 days)</span>
          </div>
          <span class="text-gray-400">in 3 days</span>
        </div>
        <Button>
          <Icon name="mdi:watering-can" size="1.5rem" />
        </Button>
      </div>
      <div class="flex justify-between">
        <div class="flex flex-col">
          <div class="flex gap-1 items-center">
            <span class="font-bold">Fertilizer</span>
            <span class="text-gray-400 text-xs">(every 28 days)</span>
          </div>
          <span class="text-gray-400">in 10 days</span>
        </div>
        <Button>
          <Icon name="healthicons:nutrition" size="1.5rem" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plant } from '~~/definitions'
defineProps<{
  plant?: Plant
}>()

const showPlant = () => {
  navigateTo('/plant')
}
</script>
