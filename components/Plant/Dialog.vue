<template>
  <Dialog
    :visible="show"
    :modal="true"
    :dismissable-mask="true"
    :breakpoints="{ '1280px': '50vw', '768px': '90vw' }"
    :style="{ width: '35vw' }"
    @update:visible="emit('hide')">
    <template #header>
      <div class="flex gap-2">
        <Icon name="material-symbols:potted-plant-sharp" size="1.5rem" />
        <h2>New Plant</h2>
      </div>
    </template>
    <div class="flex flex-col gap-2 px-2">
      <div class="flex flex-col gap-0.5">
        <label for="name">Name</label>
        <InputText id="name" v-model="newPlant.name" type="text" autofocus @keyup.enter="addPlantNavigate" />
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
            :dropdown="true"
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
    </div>
    <template #footer>
      <Button @click="addPlantNavigate">
        <div class="flex items-center gap-1">
          <Icon name="prime:save" size="1.5rem" />
          <span class="font-bold text-sm whitespace-nowrap uppercase">Ok</span>
        </div>
      </Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
  import { usePlantStore } from '~~/stores/plant'
  import { useTagsStore } from '~~/stores/tags'

  defineProps<{
    show: boolean
  }>()

  const emit = defineEmits(['added', 'hide'])

  const addPlantNavigate = async () => {
    const addedPlant = await add()
    if (addedPlant) {
      navigateTo(`/my-plants/${addedPlant.id}`)
      emit('added', addedPlant)
    }
  }

  const { newPlant, add } = $(usePlantStore())
  const { tags, fetch: fetchTags } = $(useTagsStore())
</script>
