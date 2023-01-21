<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

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
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
