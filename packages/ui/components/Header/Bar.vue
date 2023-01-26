<template>
  <div class="flex items-center gap-4 px-4 bg-slate-900 md:px-6">
    <div class="p-4 rounded-full bg-slate-800">
      <img :src="logoUrl" class="object-cover w-8 h-8 rounded-xl" />
    </div>
    <h1 class="truncate">My Garden</h1>
    <div class="grow"></div>
    <Button v-if="showPlantButton" class="p-button-text" @click="navigateNewPlant">
      <Icon name="material-symbols:potted-plant-sharp" size="1.5rem" />
      <Transition
        enter-active-class="animate__animated animate__backInRight animate__fast"
        leave-active-class="animate__animated animate__backOutRight animate__fast">
        <Icon v-if="showEditing" name="ic:round-mode-edit" size="0.9rem" class="absolute top-2 right-2" />
        <Icon v-else name="material-symbols:add-circle-rounded" size="0.9rem" class="absolute top-2 right-2" />
      </Transition>
    </Button>
  </div>
</template>

<script setup lang="ts">
  const { logoUrl } = $(useDefaultImages())
  const route = useRoute()

  const navigateNewPlant = () => {
    const { plantId } = route.params
    if (showEditing && plantId) {
      navigateTo(`/my-plants/plant/${plantId}`)
      return
    }
    navigateTo('/my-plants/plant/new')
  }

  let showEditing = $ref(false)
  let showPlantButton = $ref(false)

  const checkButtonActions = () => {
    showPlantButton = route.path.startsWith('/my-plants') && !route.path.startsWith('/my-plants/plant/')
    showEditing = route.path.startsWith('/my-plants/')
  }
  checkButtonActions()
  watch(route, checkButtonActions)
</script>
