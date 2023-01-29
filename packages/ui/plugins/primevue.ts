import { defineNuxtPlugin } from '#app'
import PrimeVue from 'primevue/config'

import Button from 'primevue/button'
import Card from 'primevue/card'
import ScrollPanel from 'primevue/scrollpanel'
import Image from 'primevue/image'
import Timeline from 'primevue/timeline'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Tag from 'primevue/tag'
import AutoComplete from 'primevue/autocomplete'
import FileUpload from 'primevue/fileupload'
import ProgressBar from 'primevue/progressbar'
import InputNumber from 'primevue/inputnumber'
import SplitButton from 'primevue/splitbutton'
import Textarea from 'primevue/textarea'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'

import Tooltip from 'primevue/tooltip'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp
  app.use(PrimeVue, { ripple: true })

  // components
  app.component('Button', Button)
  app.component('Card', Card)
  app.component('ScrollPanel', ScrollPanel)
  app.component('Toast', Toast)
  app.component('Image', Image)
  app.component('Timeline', Timeline)
  app.component('Dialog', Dialog)
  app.component('InputText', InputText)
  app.component('Tag', Tag)
  app.component('AutoComplete', AutoComplete)
  app.component('FileUpload', FileUpload)
  app.component('ProgressBar', ProgressBar)
  app.component('InputNumber', InputNumber)
  app.component('SplitButton', SplitButton)
  app.component('Textarea', Textarea)
  app.component('ConfirmDialog', ConfirmDialog)

  // directives
  app.directive('tooltip', Tooltip)

  // services
  app.use(ToastService)
  app.use(ConfirmationService)
})
