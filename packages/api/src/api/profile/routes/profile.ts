export default {
  routes: [
    {
      method: 'POST',
      path: '/profile/update',
      handler: 'profile.update',
    },
    {
      method: 'POST',
      path: '/profile/update/ics',
      handler: 'profile.createIcs',
    },
    {
      method: 'GET',
      path: '/profile/ics',
      handler: 'profile.ics',
    },
  ],
}
