<template>
  <div class="flex justify-center">
    <div class="w-112">
      <div class="flex flex-col gap-6">
        <PlantCard v-if="plant" :plant="plant" @watered="fetchPlant" @fertilized="fetchPlant" />
        <PlantHistory v-if="plant" class="ml-4" :history="orderedHistory" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Plant } from '~~/definitions'
  import { getPlant } from '~~/surrealdb/queries'
  let plant = $ref<Plant>()

  const route = useRoute()
  const fetchPlant = async () => {
    const { id } = route.params
    if (!id || id instanceof Array) return
    plant = await getPlant(id)
  }

  const orderedHistory = computed(() => {
    if (!plant) return []
    return plant.history.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  })

  onMounted(fetchPlant)

  definePageMeta({
    pageTransition: {
      name: 'slide-left',
    },
  })
</script>
