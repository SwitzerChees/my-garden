<template>
  <div class="flex flex-col gap-8 md:flex-row">
    <PlantCard v-if="plant" :plant="plant" class="grow" />
    <PlantHistory class="grow" />
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
