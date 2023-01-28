<template>
  <div class="flex bg-slate-900 justify-between">
    <Button class="p-button-text">
      <div class="flex items-center gap-2">
        <Icon name="material-symbols:potted-plant-sharp" size="1.2rem" />
        <span>Plants</span>
      </div>
    </Button>
    <Button class="p-button-text">
      <div class="flex items-center gap-2">
        <Icon name="pajamas:profile" size="1.2rem" />
        <span>Profile</span>
      </div>
    </Button>
    <Transition
      enter-active-class="animate__animated animate__backInUp animate__fast"
      leave-active-class="animate__animated animate__backOutDown animate__fast">
      <div v-if="showPlantButton" class="absolute bottom-6 flex justify-center left-0 right-0">
        <div class="bg-slate-700 rounded-full w-16 h-16 flex justify-center items-center border border-green-400">
          <Button class="p-button-text p-button-rounded" @click="navigateNewPlant">
            <Icon name="material-symbols:potted-plant-sharp" size="1.2rem" />
            <Transition
              enter-active-class="animate__animated animate__backInRight animate__fast"
              leave-active-class="animate__animated animate__backOutRight animate__fast">
              <Icon v-if="showEditing" name="ic:round-mode-edit" size="0.7rem" class="absolute top-2 right-3" />
              <Icon v-else name="material-symbols:add-circle-rounded" size="0.7rem" class="absolute top-2 right-3" />
            </Transition>
          </Button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()

  let showEditing = $ref(false)
  let showPlantButton = $ref(false)

  const navigateNewPlant = () => {
    const { plantId } = route.params
    if (showEditing && plantId) {
      navigateTo(`/my-plants/plant/${plantId}`)
      return
    }
    navigateTo('/my-plants/plant/new')
  }

  const checkButtonActions = () => {
    showPlantButton =
      route.path.startsWith('/my-plants') && !route.path.startsWith('/my-plants/plant/') && !route.path.startsWith('/my-plants/note')
    showEditing = route.path.startsWith('/my-plants/')
  }
  checkButtonActions()
  watch(route, checkButtonActions)
</script>
