// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'formidable',
    '@nuxtjs/tailwindcss', // https://tailwindcss.nuxtjs.org/
    'nuxt-icon', // https://icones.js.org/
    '@pinia/nuxt', // https://pinia.vuejs.org/
    '@nuxt/image-edge', // https://v1.image.nuxtjs.org/
  ],
  css: ['primevue/resources/primevue.min.css', 'primeicons/primeicons.css', 'assets/css/fonts.css', 'assets/css/theme.css'],
  build: {
    transpile: ['primevue'],
  },
  experimental: {
    reactivityTransform: true,
  },
  app: {
    pageTransition: { name: 'slide-right', mode: 'out-in'  },
  },
} as any)
