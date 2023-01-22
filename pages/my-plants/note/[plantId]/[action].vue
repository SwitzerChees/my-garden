<template><h1>Test</h1></template>

<script setup lang="ts">
  definePageMeta({
    pageTransition: {
      name: 'slide-right',
    },
  })

  const route = useRoute()
  onMounted(() => {
    const { plantId, action } = route.params
    console.log(plantId, action)
  })
</script>
