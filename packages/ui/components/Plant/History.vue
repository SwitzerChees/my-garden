<template>
  <div class="flex flex-col gap-2 pl-4 border-l-2 border-l-green-400">
    <div v-for="(item, index) in filteredHistory(history)" :key="index" class="relative flex flex-col justify-center min-h-[2rem] mb-8">
      <div v-if="item.action !== 'added'" class="absolute right-0 top-0">
        <Button class="p-button-text" @click="deleteHistoryElement(item)">
          <div class="flex items-center gap-1">
            <Icon name="mingcute:delete-2-line" size="1.2rem" />
          </div>
        </Button>
      </div>
      <div class="absolute top-0 bottom-0 flex flex-col justify-center left-[-2.05rem]">
        <Icon :name="actionToIcon(item.action)" size="2rem" class="p-2 text-green-400 rounded-full bg-slate-900 border border-green-400" />
      </div>
      <div class="flex flex-col gap-1 pl-4">
        <div class="flex items-center gap-2">
          <Icon name="material-symbols:date-range" size="1.2rem" />
          <span>{{ formatDate(item.createdAt) }}</span>
          <span class="text-xs text-gray-400">({{ capitalizeFirstLetter(item.action) }})</span>
        </div>
        <span v-if="item.note" class="whitespace-pre-line">{{ item.note }}</span>
        <div v-if="item.photo" class="w-48 h-48 rounded-xl mt-1 overflow-hidden flex justify-center items-center">
          <Image :src="mediaUrl(item.photo)" :srcset="getResponsiveImageSourceSet(item.photo)" :preview="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { HistoryElement } from '@my-garden/common/definitions'
  import { useConfirm } from 'primevue/useconfirm'
  import { formatDate } from '@my-garden/common/utils'
  import { useNotificationsStore } from '../../stores/notifications'
  import { Severity } from '../../definitions'
  import { actionToIcon, capitalizeFirstLetter } from '~~/utils'
  const { mediaUrl, getResponsiveImageSourceSet } = $(useUpload())
  const { updateHistoryElementStatus } = $(useMutations())
  const confirm = useConfirm()
  const notificationsStore = useNotificationsStore()

  defineProps<{ history: HistoryElement[] }>()

  const filteredHistory = (history) => history.filter((item) => item.status === 'active')

  const deleteHistoryElement = (historyElement: HistoryElement) => {
    confirm.require({
      message: 'Are you sure you want to delete this History Element?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        const updatedPlant = await updateHistoryElementStatus(historyElement.id || 0, 'archived')
        if (updatedPlant) {
          notificationsStore.addNotification({
            severity: Severity.Success,
            summary: 'History Element Deleted',
            detail: 'The History Element got successfully deleted.',
            life: 3000,
          })
          historyElement.status = 'archived'
        }
      },
    })
  }
</script>
