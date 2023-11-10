export default {
  routes: [
    {
      method: 'GET',
      path: '/push-subscriptions/vapid-token',
      handler: 'push-subscription.vapidToken',
    },
  ],
}
