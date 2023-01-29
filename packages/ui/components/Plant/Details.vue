<template>
  <div class="relative flex flex-col justify-between gap-1 p-6 bg-gray-900 rounded-xl">
    <div class="absolute right-2 top-2">
      <Button class="p-button-text z-50" @click="deletePlant(plant)">
        <div class="flex items-center gap-1">
          <Icon name="mingcute:delete-2-line" size="1.2rem" />
        </div>
      </Button>
    </div>
    <div class="w-40 h-40 rounded-xl place-self-center overflow-hidden flex justify-center items-center">
      <Image :src="mediaUrl(plant?.photo)" :srcset="getResponsiveImageSourceSet(plant?.photo)" :preview="true" />
    </div>
    <h2 class="pt-1 font-bold truncate place-self-center">{{ plant?.name }}</h2>
    <h3 v-if="plant?.botanicalName" class="text-gray-400 truncate place-self-center">{{ plant?.botanicalName }}</h3>
    <div class="flex flex-wrap gap-2 pt-1 place-self-center">
      <Tag v-for="tag of plant?.tags" :key="tag.id" severity="success">
        <span>{{ tag.name }}</span>
      </Tag>
    </div>
    <div class="mt-4 border-t border-gray-700"></div>
    <PlantReminder :plant="plant" class="pt-4" @watered="addHistory(plant, $event)" @fertilized="addHistory(plant, $event)" />
  </div>
</template>

<script setup lang="ts">
  import { useConfirm } from 'primevue/useconfirm'
  import { HistoryElement, Plant } from '@my-garden/common/definitions'
  import { useNotificationsStore } from '../../stores/notifications'
  import { Severity } from '../../definitions'
  const { mediaUrl, getResponsiveImageSourceSet } = $(useUpload())
  const { updatePlantStatus } = $(useMutations())
  const router = useRouter()
  const confirm = useConfirm()
  const notificationsStore = useNotificationsStore()

  defineProps<{ plant: Plant }>()

  const addHistory = (plant: Plant, historyElement: HistoryElement) => {
    plant.history.push(historyElement)
  }

  const deletePlant = (plant: Plant) => {
    confirm.require({
      message: 'Are you sure you want to delete the Plant?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        const updatedPlant = await updatePlantStatus(plant.id || 0, 'archived')
        if (updatedPlant) {
          notificationsStore.addNotification({
            severity: Severity.Success,
            summary: 'Plant Deleted',
            detail: 'The Plant got successfully deleted.',
            life: 3000,
          })
          router.replace('/my-plants')
        }
      },
    })
  }
</script>
