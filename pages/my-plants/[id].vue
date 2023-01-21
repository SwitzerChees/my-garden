<template>
  <div class="flex flex-col gap-8 md:flex-row">
    <Plant :plant="selectedPlant" class="grow" />
    <PlantHistory class="grow" />
  </div>
</template>

<script setup lang="ts">
import { usePlantStore } from '~~/stores/plant'

const route = useRoute()
console.log(route.params.id)

definePageMeta({
  pageTransition: {
    name: 'slide-left',
  },
})
const { selectedPlant } = $(usePlantStore())
</script>
