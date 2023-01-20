<template>
  <Dialog v-model:visible="dialogOpen" :dismissable-mask="true" :modal="true">
    <template #header>
      <div class="flex gap-2">
        <Icon name="material-symbols:potted-plant-sharp" size="1.5rem" />
        <h2>New Plant</h2>
      </div>
    </template>
    <div class="flex flex-col gap-2 px-2">
      <div class="flex flex-col gap-0.5">
        <label for="name">Name</label>
        <InputText id="name" type="text" v-model="newPlant.name" autofocus @keyup.enter="addPlantNavigate" />
      </div>
      <div class="flex flex-col gap-0.5">
        <label for="botanical">Botanical Name</label>
        <InputText id="botanical" type="text" v-model="newPlant.botanicalName" @keyup.enter="addPlantNavigate" />
      </div>
      <div class="flex flex-col gap-0.5">
        <label for="tags">Tags</label>
        <AutoComplete
          :multiple="true"
          :force-selection="true"
          :completeOnFocus="true"
          :dropdown="true"
          id="tags"
          v-model="newPlant.tags"
          :suggestions="tags"
          @complete="fetchTags($event.query)"
          option-label="name"
        >
          <template #chip="{ value: tag }">
            <div class="flex items-center gap-2">
              <Icon v-if="!tag.id" name="system-uicons:reset-temporary" size="0.9rem" />
              <span class="text-xs">{{ tag.name }}</span>
            </div>
          </template>
        </AutoComplete>
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

const addPlantNavigate = async () => {
  if (await add()) navigateTo('/plant')
}

const { dialogOpen, newPlant, add } = $(usePlantStore())
const { tags, fetch: fetchTags } = $(useTagsStore())
</script>
