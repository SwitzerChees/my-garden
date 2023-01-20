<template>
  <div class="flex bg-slate-900 items-center gap-4 px-4">
    <div class="rounded-full bg-slate-800 p-2">
      <Logo class="h-10 w-10" />
    </div>
    <h1 class="truncate">My Garden</h1>
    <div class="grow"></div>
    <Transition enter-active-class="animate__animated animate__backInRight animate__faster" leave-active-class="animate__animated animate__backOutRight animate__faster">
      <Button v-if="showNewPlant" class="p-button-text" @click="dialogOpen = true">
        <Icon name="material-symbols:potted-plant-sharp" size="1.5rem" />
        <Icon name="material-symbols:add-circle-rounded" size="0.9rem" class="absolute top-2 right-2" />
      </Button>
    </Transition>
  </div>
</template>

<script setup>
import { usePlantStore } from '~~/stores/plant'

const { dialogOpen, showNewPlant } = $(usePlantStore())
</script>
