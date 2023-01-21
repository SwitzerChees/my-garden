<template>
  <div class="flex justify-center">
    <div class="w-112">
      <div class="flex flex-col gap-8">
        <PlantCard v-if="plant" :plant="plant" class="grow" />
        <PlantHistory class="grow" :history="history" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { HistoryElement, Plant } from '~~/definitions'
  import { getPlant } from '~~/surrealdb/queries'
  let plant = $ref<Plant>()

  const route = useRoute()
  onMounted(async () => {
    const { id } = route.params
    if (!id || id instanceof Array) return
    plant = await getPlant(id)
  })

  const history: HistoryElement[] = $ref([
    {
      createdAt: new Date(),
      action: 'added',
      photo: {
        imageName: 'default.jpg',
      },
      note: 'This is a comment',
    },
    {
      createdAt: new Date(),
      action: 'watered',
      note: 'This is a comment',
    },
    {
      createdAt: new Date(),
      action: 'fertilized',
      note: 'This is a comment',
    },
    {
      createdAt: new Date(),
      action: 'repotted',
      note: 'This is a comment',
    },
    {
      createdAt: new Date(),
      action: 'pruned',
      note: 'This is a comment',
    },
  ] as HistoryElement[])

  definePageMeta({
    pageTransition: {
      name: 'slide-left',
    },
  })
</script>
