<template>
  <div class="flex justify-center pt-2">
    <div class="w-112">
      <div class="flex flex-col gap-6">
        <div class="flex justify-between">
          <div class="flex flex-col justify-center">
            <Button class="p-button-text" @click="startUpload">
              <div class="flex items-center gap-1">
                <Icon name="material-symbols:photo-camera" size="1.2rem" />
                <span>Image</span>
              </div>
            </Button>
            <ProgressBar v-if="progressUpload" mode="indeterminate" style="height: 0.3rem" />
          </div>
          <div class="hidden">
            <FileUpload
              ref="upload"
              name="photo"
              url="/api/upload"
              :auto="true"
              accept="image/*"
              @upload="uploadComplete"
              @before-send="progressUpload = true" />
          </div>
          <SplitButton class="bg-text border-round" :model="items">
            <Button class="p-button-text" @click="navigateNote()">
              <div class="flex items-center gap-1">
                <Icon name="material-symbols:sticky-note-2-sharp" size="1.2rem" />
                <span>Note</span>
              </div>
            </Button>
          </SplitButton>
        </div>
        <PlantDetails v-if="plant" :plant="plant" @watered="fetchPlant" @fertilized="fetchPlant" />
        <PlantHistory v-if="plant" class="ml-4" :history="orderedHistory" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import lfp from 'lodash/fp'
  import { Photo, Plant } from '@my-garden/common/definitions'
  import { addHistoryElement } from '~~/surrealdb/mutations'
  const { getPlant } = $(useQueries())
  let plant = $ref<Plant>()
  const { first } = lfp

  const route = useRoute()
  const fetchPlant = async () => {
    const { plantId } = route.params
    if (!plantId || plantId instanceof Array) return
    plant = await getPlant(parseInt(plantId))
  }

  const orderedHistory = computed(() => {
    if (!plant?.history) return []
    return plant.history.sort((a, b) => new Date(b.createdAt as any).getTime() - new Date(a.createdAt as any).getTime())
  })

  let progressUpload = $ref(false)

  const uploadComplete = async ({ xhr: { response: photos } }: { xhr: { response: string } }) => {
    progressUpload = false
    const photo = first(JSON.parse(photos)) as any
    if (!photo || !plant?.id) return
    const historyElement = await addHistoryElement(plant.id as any, { action: 'image', photo, createdAt: new Date() })
    if (!historyElement) return
    plant.history.push(historyElement)
  }

  const upload = $ref<any>(null)
  const startUpload = () => {
    if (!upload) return
    upload.choose()
  }

  onMounted(fetchPlant)

  const navigateNote = (action?: string) => {
    action = action || 'note'
    navigateTo(`/my-plants/note/${plant?.id}/${action}`)
  }

  const items = ref([
    {
      label: 'Prune',
      command: () => navigateNote('pruned'),
    },
    {
      label: 'Repot',
      command: () => navigateNote('repotted'),
    },
    {
      label: 'Sterilize',
      command: () => navigateNote('sterilized'),
    },
    {
      label: 'Measure',
      command: () => navigateNote('measured'),
    },
  ])
</script>
