<template>
  <div class="flex flex-col gap-2 pl-4 border-l-2 border-l-green-400">
    <div v-for="(item, index) in history" :key="index" class="relative flex flex-col justify-center min-h-[2rem] mb-8">
      <div class="absolute top-0 bottom-0 flex flex-col justify-center left-[-2.05rem]">
        <Icon :name="actionToIcon(item.action)" size="2rem" class="p-2 text-green-400 rounded-full bg-slate-900 border border-green-400" />
      </div>
      <div class="flex flex-col gap-1 pl-4">
        <div class="flex items-center gap-2">
          <Icon name="material-symbols:date-range" size="1.2rem" />
          <span>{{ formatDate(item.createdAt) }}</span>
          <span class="text-xs text-gray-400">({{ capitalizeFirstLetter(item.action) }})</span>
        </div>
        <span v-if="item.note">{{ item.note }}</span>
        <nuxt-img
          v-if="item.photo"
          :src="photoUrl(item.photo)"
          width="256px"
          height="256px"
          class="object-cover w-48 h-48 rounded-xl mt-1" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { HistoryElement } from '@my-garden/common/definitions'
  import { formatDate, photoUrl, actionToIcon } from '~~/utils'
  defineProps<{ history: HistoryElement[] }>()
</script>