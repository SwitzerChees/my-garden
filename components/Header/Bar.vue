<template>
  <div class="flex bg-slate-900 items-center gap-4 px-4 md:px-6">
    <div class="rounded-full bg-slate-800 p-4">
      <nuxt-img src="/uploads/monstera.png" width="256px" height="256px" class="object-cover rounded-xl h-8 w-8" />
    </div>
    <h1 class="truncate">My Garden</h1>
    <div class="grow"></div>
    <Transition
      enter-active-class="animate__animated animate__backInRight animate__fast"
      leave-active-class="animate__animated animate__backOutRight animate__fast">
      <Button v-if="showNewPlantButton" class="p-button-text" @click="navigateNewPlant">
        <Icon name="material-symbols:potted-plant-sharp" size="1.5rem" />
        <Icon name="material-symbols:add-circle-rounded" size="0.9rem" class="absolute top-2 right-2" />
      </Button>
    </Transition>
  </div>
</template>

<script setup>
  const navigateNewPlant = () => {
    navigateTo('/my-plants/new')
  }

  let showNewPlantButton = $ref(false)
  const route = useRoute()
  const checkShowNewPlantButton = () => {
    showNewPlantButton = route.path === '/my-plants'
  }
  checkShowNewPlantButton()
  watch(route, checkShowNewPlantButton)
</script>
