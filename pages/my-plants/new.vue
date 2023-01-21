<template>
  <div>
    <div class="flex flex-col gap-2">
      <div class="relative self-center w-32 h-32 cursor-pointer group" @click="startUpload">
        <nuxt-img :src="photoUrl(newPlant)" width="256px" height="256px" class="object-cover rounded-xl" />
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
        <InputText id="name" v-model="newPlant.name" type="text" @keyup.enter="addPlantNavigate" />
      </div>
      <div class="flex flex-col gap-0.5">
        <label for="botanical">Botanical Name</label>
        <InputText id="botanical" v-model="newPlant.botanicalName" type="text" @keyup.enter="addPlantNavigate" />
      </div>
      <div class="flex flex-col gap-0.5">
        <label for="tags">Tags</label>
        <div class="p-fluid">
          <AutoComplete
            id="tags"
            v-model="newPlant.tags"
            :multiple="true"
            :force-selection="true"
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
      <div class="flex justify-end pt-4">
        <Button @click="addPlantNavigate">
          <div class="flex items-center gap-1">
            <Icon name="prime:save" size="1.5rem" />
            <span class="text-sm font-bold uppercase whitespace-nowrap">Ok</span>
          </div>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import lfp from 'lodash/fp'
  import FileUpload from 'primevue/fileupload'
  import { usePlantStore } from '~~/stores/plant'
  import { useTagsStore } from '~~/stores/tags'
  import { Photo } from '~~/definitions'
  import { photoUrl } from '~~/utils'
  const { first } = lfp
  const router = useRouter()

  definePageMeta({
    pageTransition: {
      name: 'slide-left',
    },
  })

  const addPlantNavigate = async () => {
    const addedPlant = await add()
    if (addedPlant) {
      router.replace(`/plant/${addedPlant.id}`)
    }
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
    newPlant.photo = photo
  }

  const { newPlant, add } = $(usePlantStore())
  const { tags, fetch: fetchTags } = $(useTagsStore())
</script>
