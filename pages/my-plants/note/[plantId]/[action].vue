<template>
  <div class="flex justify-center px-2 pt-2">
    <div class="w-112">
      <h1>{{ 'Tets' }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    pageTransition: {
      name: 'slide-left',
    },
  })

  const route = useRoute()
  onMounted(() => {
    const { plantId, action } = route.params
    console.log(plantId, action)
  })
</script>
