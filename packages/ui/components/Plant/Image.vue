<template>
  <Image :src="responsiveMediaUrl(width, image)" image-class="object-contain" />
</template>

<script setup lang="ts">
  import { Media } from '~~/../common/definitions'
  const { responsiveMediaUrl } = $(useUpload())

  defineProps<{
    image?: Media
    width: number
  }>()
</script>
