<template>
  <div class="flex flex-col min-h-screen min-w-full bg-slate-800 text-gray-100">
    <HeaderBar class="p-2 fixed right-0 left-0 top-0 z-50" />
    <div class="p-4 md:p-6 pt-24 md:pt-24">
      <slot />
    </div>
    <div class="border-t border-gray-700 mx-10 mt-4"></div>
    <span class="text-center pt-6 pb-10 px-20">My Garden created for 🌱 with a lot of ☕️ and ❤️</span>
  </div>
</template>
