<template>
  <Toast position="top-right" />
</template>

<script setup lang="ts">
  import { useToast } from 'primevue/usetoast'
  import { useNotificationsStore } from '../stores/notifications'
  const toast = useToast()
  const notificationsStore = useNotificationsStore()

  onMounted(() => {
    watch(notificationsStore.notifications, (notifications) => {
      const notificationsToShow = notifications.filter((n) => !n.shownAt)
      notificationsToShow.forEach((notification) => {
        toast.add({
          ...notification,
          summary: notification.summary,
          detail: notification.detail,
        })
        notification.shownAt = new Date()
      })
    })
  })
</script>
