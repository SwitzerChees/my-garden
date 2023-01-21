<template>
  <div class="flex flex-col min-w-full min-h-screen text-gray-100 bg-slate-800">
    <HeaderBar class="fixed top-0 left-0 right-0 z-50 p-2" />
    <div class="p-4 pt-24 md:p-6 md:pt-24">
      <slot />
    </div>
    <div class="mx-10 mt-4 border-t border-gray-700"></div>
    <span class="px-20 pt-6 pb-10 text-center">My Garden created for 🌱 with a lot of ☕️ and ❤️</span>
  </div>
</template>
