<template>
  <div class="flex flex-col gap-8 md:flex-row">
    <Plant class="grow"/>
    <PlantHistory class="grow"/>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: 'slide-left'
  }
})
</script>
