<template>
  <div class="flex bg-slate-900 items-center gap-4 px-4">
    <PlantDialog />
    <div class="rounded-full bg-slate-800 p-2">
      <HeaderLogo class="h-10 w-10" />
    </div>
    <h1 class="truncate">My Garden</h1>
    <div class="grow"></div>
    <Transition
      enter-active-class="animate__animated animate__backInRight animate__fast"
      leave-active-class="animate__animated animate__backOutRight animate__fast"
    >
      <Button v-if="showNewPlantButton" class="p-button-text" @click="showNewPlantDialog = true">
        <Icon name="material-symbols:potted-plant-sharp" size="1.5rem" />
        <Icon name="material-symbols:add-circle-rounded" size="0.9rem" class="absolute top-2 right-2" />
      </Button>
    </Transition>
  </div>
</template>

<script setup>
import { useUIStore } from '~~/stores/ui'
const { showNewPlantDialog, showNewPlantButton } = $(useUIStore())
</script>
