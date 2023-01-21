<template>
  <div class="flex flex-col w-screen h-screen bg-slate-800 text-gray-50">
    <HeaderBar class="p-2" />
    <ScrollPanel class="grow p-4 overflow-hidden overflow-y-auto">
      <div class="pb-20">
        <slot />
      </div>
    </ScrollPanel>
  </div>
</template>
