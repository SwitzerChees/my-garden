import { defineNuxtPlugin } from '#app'
import PrimeVue from 'primevue/config'

import Button from 'primevue/button'
import Card from 'primevue/card'
import ScrollPanel from 'primevue/scrollpanel'
import Image from 'primevue/image'
import Timeline from 'primevue/timeline'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext';

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp
  app.use(PrimeVue, { ripple: true })

  // components
  app.component('Button', Button)
  app.component('Card', Card)
  app.component('ScrollPanel', ScrollPanel)
  app.component('Image', Image)
  app.component('Timeline', Timeline)
  app.component('Dialog', Dialog)
  app.component('InputText', InputText)
})
