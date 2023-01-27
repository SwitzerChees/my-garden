export default {
  routes: [
    {
      method: 'GET',
      path: '/plants/reminder/ical/:token',
      handler: 'plant.ical',
    },
  ],
}
