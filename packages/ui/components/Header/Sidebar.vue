<template>
  <div class="flex flex-col bg-slate-900 w-[5rem] items-center gap-2">
    <div
      class="p-2 md:p-3 rounded-full w-14 h-14 bg-slate-800 cursor-pointer flex justify-center items-center mt-2 z-50"
      @click="navigateHome">
      <img :src="logoUrl" class="object-cover w-8 h-8 rounded-xl" />
    </div>
    <div class="h-20 pt-2">
      <Transition
        enter-active-class="animate__animated animate__backInLeft animate__fast"
        leave-active-class="animate__animated animate__backOutLeft animate__fast">
        <Button v-if="showPlantButton && !isLoginPage" v-tooltip.right="newPlantTooltip" class="p-button-text" @click="navigateNewPlant">
          <Icon name="material-symbols:potted-plant-sharp" size="1.5rem" />
          <Transition
            enter-active-class="animate__animated animate__backInLeft animate__fast"
            leave-active-class="animate__animated animate__backOutLeft animate__fast">
            <Icon v-if="showEditing" name="ic:round-mode-edit" size="0.9rem" class="absolute top-2 right-2" />
            <Icon v-else name="material-symbols:add-circle-rounded" size="0.9rem" class="absolute top-2 right-2" />
          </Transition>
        </Button>
      </Transition>
    </div>
    <Button v-if="!isLoginPage" v-tooltip.right="'Plants'" class="p-button-text" @click="navigateMyPlants">
      <div class="flex items-center gap-2">
        <Icon name="teenyicons:plant-outline" size="1.2rem" />
      </div>
    </Button>
    <Button v-if="!isLoginPage" v-tooltip.right="'Profile'" class="p-button-text" @click="navigateProfile">
      <div class="flex items-center gap-2">
        <Icon name="pajamas:profile" size="1.2rem" />
      </div>
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

  const navigateHome = () => {
    navigateTo('/')
  }

  const navigateMyPlants = () => {
    navigateTo('/my-plants')
  }

  const navigateProfile = () => {
    navigateTo('/profile')
  }

  const isLoginPage = $computed(() => {
    return route.path.startsWith('/login')
  })

  let showEditing = $ref(false)
  let showPlantButton = $ref(false)

  const newPlantTooltip = $computed(() => {
    if (showEditing) {
      return 'Edit Plant'
    }
    return 'Add New Plant'
  })

  const checkButtonActions = () => {
    showPlantButton =
      route.path.startsWith('/my-plants') && !route.path.startsWith('/my-plants/plant/') && !route.path.startsWith('/my-plants/note')
    showEditing = route.path.startsWith('/my-plants/')
  }
  checkButtonActions()
  watch(route, checkButtonActions)
</script>
