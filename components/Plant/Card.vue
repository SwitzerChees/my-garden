<template>
  <div class="flex flex-col justify-between bg-gray-900 gap-1 rounded-xl">
    <div class="flex px-4 pt-3 pb-2 gap-2">
      <nuxt-img :src="photoUrl(plant)" width="128px" height="128px" class="object-cover h-14 w-14 rounded-xl" />
      <div class="flex flex-col justify-between overflow-hidden grow">
        <div class="flex flex-col gap-0.5">
          <h2 class="text-sm font-bold truncate">{{ plant?.name }}</h2>
          <!-- <h3 v-if="plant?.botanicalName" class="text-xs text-gray-400 truncate">{{ plant?.botanicalName }}</h3> -->
        </div>
        <div class="flex flex-wrap pt-2 gap-2">
          <Tag v-for="tag of plant?.tags" :key="tag.id" severity="success">
            <span class="text-xs">{{ tag.name }}</span>
          </Tag>
        </div>
      </div>
      <div>
        <Button class="p-button-text" @click="showPlant(plant.id)">
          <Icon name="ic:baseline-remove-red-eye" size="1.5rem" />
        </Button>
      </div>
    </div>
    <div class="flex flex-col gap-1">
      <div class="border-t border-gray-700"></div>
      <div class="flex flex-col p-4 gap-4">
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <div class="flex items-center gap-1">
              <span class="font-bold">Water</span>
              <span class="text-xs text-gray-400">(every 14 days)</span>
            </div>
            <span class="text-gray-400">in 3 days</span>
          </div>
          <Button>
            <Icon name="mdi:watering-can" size="1.5rem" />
          </Button>
        </div>
        <div class="flex justify-between">
          <div class="flex flex-col">
            <div class="flex items-center gap-1">
              <span class="font-bold">Fertilizer</span>
              <span class="text-xs text-gray-400">(every 28 days)</span>
            </div>
            <span class="text-gray-400">in 10 days</span>
          </div>
          <Button>
            <Icon name="healthicons:nutrition" size="1.5rem" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Plant } from '~~/definitions'
  import { photoUrl } from '~~/utils'

  defineProps<{ plant: Plant }>()

  const showPlant = (id: string) => {
    navigateTo(`/plant/${id}`)
  }
</script>
