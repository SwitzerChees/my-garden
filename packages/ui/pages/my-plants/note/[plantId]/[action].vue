<template>
  <div class="flex justify-center">
    <div class="w-112">
      <div class="flex flex-col gap-2">
        <div class="flex items-center self-center gap-2">
          <Icon :name="actionToIcon(action)" size="1.5rem" />
          <h1 class="p-2 text-lg font-bold">{{ capitalizeFirstLetter(action) }}</h1>
        </div>
        <div class="relative self-center w-32 h-32 cursor-pointer group" @click="startUpload">
          <nuxt-img :src="photoUrl(historyElement?.photo)" width="256px" height="256px" class="object-cover rounded-xl" />
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
          <label for="note">Note</label>
          <Textarea id="note" v-model="historyElement.note" :auto-resize="true" rows="4" />
        </div>
        <div class="flex justify-between pt-4">
          <Button class="p-button-danger" @click="cancelNavigate">
            <div class="flex items-center gap-1">
              <Icon name="material-symbols:cancel" size="1.5rem" />
              <span class="text-sm font-bold uppercase whitespace-nowrap">Cancel</span>
            </div>
          </Button>
          <Button @click="addNoteNavigate">
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
  import { HistoryElement, Photo, HistoryElementType } from '@my-garden/common/definitions'
  import { addHistoryElement } from '~~/surrealdb/mutations'
  const router = useRouter()
  const { first } = lfp

  definePageMeta({
    pageTransition: {
      name: 'slide-left',
    },
  })

  const route = useRoute()
  const plantId = route.params.plantId instanceof Array ? first(route.params.plantId) : route.params.plantId ? route.params.plantId : ''
  const action = route.params.action instanceof Array ? first(route.params.action) : route.params.action ? route.params.action : ''
  const historyElement = $ref<any>({ action: (action || 'note') as HistoryElementType, note: '', createdAt: new Date() })

  const addNoteNavigate = async () => {
    if (!plantId) return
    const addedHistoryElement = await addHistoryElement(plantId, historyElement)
    if (addedHistoryElement) {
      return router.back()
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
    historyElement.photo = photo
  }
</script>
