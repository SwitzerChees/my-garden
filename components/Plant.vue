<template>
  <div class="flex flex-col gap-1 bg-gray-900 rounded-xl">
    <div class="flex p-2 px-4 pt-3 gap-2">
      <nuxt-img src="/uploads/2023011517364_51302.jpg" width="128px" height="128px" class="object-cover h-14 w-14 rounded-xl" />
      <div class="flex flex-col overflow-hidden grow">
        <h2 class="font-bold truncate text-sm">Monstera Deliciosa</h2>
        <h3 class="text-xs truncate">Scindapsus Marble Queen</h3>
      </div>
      <Button class="p-button-text">
        <Icon name="lucide:more-horizontal" size="1.5rem" />
      </Button>
    </div>
    <div class="border-t border-gray-700"></div>
    <div class="flex flex-col gap-4 p-4">
      <div class="flex justify-between items-center">
        <div class="flex flex-col">
          <span class="font-bold">Water</span>
          <span class="text-gray-400">in 3 days</span>
        </div>
        <div>
          <Button>
            <Icon name="healthicons:nutrition" size="1.5rem" />
          </Button>
        </div>
      </div>
      <div class="flex justify-between">
        <div class="flex flex-col">
          <span class="font-bold">Fertilizer</span>
          <span class="text-gray-400">in 10 days</span>
        </div>
        <div>
          <Button>
            <Icon name="mdi:watering-can" size="1.5rem" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
