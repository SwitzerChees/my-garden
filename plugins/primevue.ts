import { defineNuxtPlugin } from '#app'
import PrimeVue from 'primevue/config'

import Button from 'primevue/button'
import Card from 'primevue/card'
import ScrollPanel from 'primevue/scrollpanel'
import Image from 'primevue/image'

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp
  app.use(PrimeVue, { ripple: true })

  // components
  app.component('Button', Button)
  app.component('Card', Card)
  app.component('ScrollPanel', ScrollPanel)
  app.component('Image', Image)
})
