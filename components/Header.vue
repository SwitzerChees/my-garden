<template>
  <div class="flex bg-slate-900 items-center gap-4 px-4">
    <div class="rounded-full bg-slate-800 p-2">
      <Logo class="h-8 w-8" />
    </div>
    <h1 class="truncate">My Garden</h1>
    <div class="grow"></div>
    <div>
      <Button class="p-button-text" @click="dialogOpen = true">
        <div class="flex items-center gap-1">
          <Icon name="material-symbols:potted-plant-sharp" size="1.5rem" />
          <span class="font-bold text-sm whitespace-nowrap">New Plant</span>
        </div>
      </Button>
    </div>
  </div>
</template>

<script setup>
import { usePlantStore } from '~~/stores/plant';

const { dialogOpen } = $(usePlantStore())
</script>
