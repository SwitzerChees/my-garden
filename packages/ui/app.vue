<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
  useServerSeoMeta({
    title: 'MyGarden',
    ogTitle: 'MyGarden',
    description: 'Transform Your Green Thumb with this amazing Personal Plant Manager!',
    ogDescription: 'Transform Your Green Thumb with this amazing Personal Plant Manager!',
    ogImage: 'https://mygarden.hackerman.ch/logo.png',
  })
</script>
<style>
  .slide-left-enter-active,
  .slide-left-leave-active {
    transition: all 0.35s;
  }
  .slide-left-enter {
    transform: translateX(-100%);
  }
  .slide-left-leave-to {
    transform: translateX(100%);
  }

  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: all 0.35s;
  }
  .slide-right-enter {
    transform: translateX(100%);
  }
  .slide-right-leave-to {
    transform: translateX(-100%);
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.35s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
