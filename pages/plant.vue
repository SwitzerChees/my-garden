<template>
  <div class="flex flex-col gap-8 md:flex-row">
    <Plant :plant="plant" class="grow" />
    <PlantHistory class="grow" />
  </div>
</template>

<script setup lang="ts">
import { usePlantStore } from '~~/stores/plant'

definePageMeta({
  pageTransition: {
    name: 'slide-left',
  },
})
const { plant } = $(usePlantStore())
</script>
