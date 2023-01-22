<template>
  <div class="flex flex-col justify-between gap-1 bg-gray-900 rounded-xl">
    <div class="flex gap-2 px-4 pt-3 pb-2 cursor-pointer" @click="showPlant(plant.id)">
      <nuxt-img :src="photoUrl(plant?.photo)" width="128px" height="128px" class="object-cover h-14 w-14 rounded-xl" />
      <div class="flex flex-col justify-between overflow-hidden grow">
        <div class="flex flex-col gap-0.5">
          <h2 class="text-sm font-bold truncate">{{ plant?.name }}</h2>
        </div>
        <div class="flex flex-wrap gap-2 pt-2">
          <Tag v-for="tag of plant?.tags" :key="tag.id" severity="success">
            <span class="text-xs">{{ tag.name }}</span>
          </Tag>
        </div>
      </div>
      <div>
        <Button class="p-button-text">
          <Icon name="ic:baseline-remove-red-eye" size="1.5rem" />
        </Button>
      </div>
    </div>
    <div class="border-t border-gray-700"></div>
    <PlantReminder :plant="plant" @watered="emits('watered', $event)" @fertilized="emits('fertilized', $event)" />
  </div>
</template>

<script setup lang="ts">
  import { Plant } from '~~/definitions'
  import { photoUrl } from '~~/utils'

  defineProps<{ plant: Plant }>()

  const emits = defineEmits(['watered', 'fertilized'])

  const route = useRoute()

  const showPlant = (id: string) => {
    if (route.path === `/my-plants/${id}`) return
    navigateTo(`/my-plants/${id}`)
  }
</script>
