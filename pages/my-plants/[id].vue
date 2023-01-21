<template>
  <div class="flex justify-center">
    <div class="w-112">
      <div class="flex flex-col gap-6">
        <PlantCard v-if="plant" :plant="plant" />
        <PlantHistory v-if="plant" class="ml-4" :history="plant.history" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Plant } from '~~/definitions'
  import { getPlant } from '~~/surrealdb/queries'
  let plant = $ref<Plant>()

  const route = useRoute()
  onMounted(async () => {
    const { id } = route.params
    if (!id || id instanceof Array) return
    plant = await getPlant(id)
  })

  definePageMeta({
    pageTransition: {
      name: 'slide-left',
    },
  })
</script>
