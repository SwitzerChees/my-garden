<template>
  <div class="flex flex-col min-w-full min-h-screen text-gray-100 bg-slate-800 pb-14 md:pb-0">
    <HeaderBar class="fixed top-0 left-0 right-0 z-40 p-2 hidden md:flex" />
    <HeaderSidebar class="fixed top-0 bottom-0 left-0 z-50 hidden md:flex" />
    <div class="p-6 pt-4 md:pt-24 md:pl-28 grow">
      <slot />
    </div>
    <FooterBar v-if="isLoggedIn" class="md:hidden fixed -bottom-0.5 left-0 right-0 z-50 p-2" />
    <div class="mx-6 md:ml-28 mt-2 border-t border-gray-700"></div>
    <span class="px-20 md:pl-40 pt-6 pb-20 text-center"
      >MyGarden 2.0 created for 🪴 with a lot of ☕️ and ❤️ <br /><NuxtLink to="/privacy-policy"> Privacy Policy</NuxtLink></span
    >

    <Notifications />
    <ConfirmDialog />
  </div>
</template>

<script setup lang="ts">
  const user = $(useStrapiUser())

  const isLoggedIn = $computed(() => {
    return user
  })
</script>
