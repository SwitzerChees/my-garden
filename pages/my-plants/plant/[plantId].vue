<template>
  <div class="flex justify-center">
    <div class="w-112">
      <div class="flex flex-col gap-2">
        <div class="relative self-center w-32 h-32 cursor-pointer group" @click="startUpload">
          <nuxt-img :src="photoUrl(plant?.photo)" width="256px" height="256px" class="object-cover rounded-xl" />
          <div v-if="progressUpload" class="absolute bottom-0 left-0 right-0">
            <ProgressBar mode="indeterminate" style="height: 0.3rem" />
          </div>
          <div v-else class="absolute flex items-center justify-center p-2 rounded-full bottom-2 right-2 bg-slate-900 opacity-80">
            <Icon name="material-symbols:android-camera-outline" size="1.5rem" />
          </div>
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
        <div class="flex flex-col gap-0.5">
          <label for="name">Name</label>
          <InputText id="name" v-model="plant.name" type="text" @keyup.enter="addPlantNavigate" />
        </div>
        <div class="flex flex-col gap-0.5">
          <label for="botanical">Botanical Name</label>
          <InputText id="botanical" v-model="plant.botanicalName" type="text" @keyup.enter="addPlantNavigate" />
        </div>
        <div class="flex flex-col gap-0.5">
          <label for="tags">Tags</label>
          <div class="p-fluid">
            <AutoComplete
              id="tags"
              v-model="plant.tags"
              :multiple="true"
              :complete-on-focus="true"
              :suggestions="tags"
              option-label="name"
              @complete="fetchTags($event.query)">
              <template #chip="{ value: tag }">
                <div class="flex items-center gap-2">
                  <Icon v-if="!tag.id" name="system-uicons:reset-temporary" size="0.9rem" />
                  <span class="text-xs">{{ tag.name }}</span>
                </div>
              </template>
            </AutoComplete>
          </div>
        </div>
        <div class="flex flex-col gap-0.5">
          <label for="botanical">Water Reminder</label>
          <InputNumber
            v-model="plant.reminder.water"
            prefix="every  "
            suffix=" days"
            :min="0"
            :max-fraction-digits="0"
            :show-buttons="true"
            decrement-button-class="p-button-danger"
            increment-button-class="p-button-success"
            increment-button-icon="pi pi-plus"
            decrement-button-icon="pi pi-minus" />
        </div>
        <div class="flex flex-col gap-0.5">
          <label for="botanical">Fertilize Reminder</label>
          <InputNumber
            v-model="plant.reminder.fertilize"
            prefix="every  "
            suffix=" days"
            :min="0"
            :max-fraction-digits="0"
            :show-buttons="true"
            decrement-button-class="p-button-danger"
            increment-button-class="p-button-success"
            increment-button-icon="pi pi-plus"
            decrement-button-icon="pi pi-minus" />
        </div>
        <div class="flex justify-between pt-4">
          <Button class="p-button-danger" @click="cancelNavigate">
            <div class="flex items-center gap-1">
              <Icon name="material-symbols:cancel" size="1.5rem" />
              <span class="text-sm font-bold uppercase whitespace-nowrap">Cancel</span>
            </div>
          </Button>
          <Button @click="addPlantNavigate">
            <div class="flex items-center gap-1">
              <Icon name="prime:save" size="1.5rem" />
              <span class="text-sm font-bold uppercase whitespace-nowrap">Ok</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import lfp from 'lodash/fp'
  import FileUpload from 'primevue/fileupload'
  import { getPlant, getTags } from '~~/surrealdb/queries'
  import { Photo, Plant, Tag } from '~~/definitions'
  import { photoUrl } from '~~/utils'
  import { addOrUpdatePlant } from '~~/surrealdb/mutations'
  const { first } = lfp
  const router = useRouter()

  let plant = $ref<Plant>({ name: '', botanicalName: '', tags: [], history: [], reminder: { water: 0, fertilize: 0 } })

  const route = useRoute()
  onMounted(async () => {
    const { plantId } = route.params
    if (!plantId || plantId instanceof Array || plantId === 'new') return
    const existingPlant = await getPlant(plantId)
    if (existingPlant) plant = existingPlant
  })

  definePageMeta({
    pageTransition: {
      name: 'slide-left',
    },
  })

  const addPlantNavigate = async () => {
    const addedPlant = await addOrUpdatePlant(plant)
    if (addedPlant) {
      if (plant.id) return router.back()
      router.replace(`/my-plants/${addedPlant.id}`)
    }
  }

  const cancelNavigate = () => {
    router.back()
  }

  const upload = $ref<any>(null)
  const startUpload = () => {
    if (!upload) return
    upload.choose()
  }

  let progressUpload = $ref(false)

  const uploadComplete = ({ xhr: { response: photos } }: { xhr: { response: string } }) => {
    progressUpload = false
    const photo = first(JSON.parse(photos)) as Photo
    if (!photo) return
    plant.photo = photo
  }

  let tags = $ref<Tag[]>([])
  const fetchTags = async (query?: string) => {
    tags = await getTags({ query, withDummy: true, exclude: plant.tags })
  }
</script>
