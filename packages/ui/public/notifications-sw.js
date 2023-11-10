self.addEventListener('push', (event) => {
  const pushData = event.data.json()
  self.registration.showNotification(pushData.title, pushData)
})

self.addEventListener('notificationclick', function (event) {
  clients.openWindow(event.notification.data.url)
})
