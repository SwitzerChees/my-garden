<template>
  <div class="flex flex-col gap-2">
    <div></div>
    <div class="flex grow flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Plant v-for="plant of plants" :key="plant.id" :plant="plant" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlantsStore } from '~~/stores/plants'
onMounted(() => {
  fetch()
})
const { plants, fetch } = $(usePlantsStore())
</script>
