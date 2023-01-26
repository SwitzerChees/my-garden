// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'formidable',
    '@nuxtjs/tailwindcss', // https://tailwindcss.nuxtjs.org/
    'nuxt-icon', // https://icones.js.org/
    '@pinia/nuxt', // https://pinia.vuejs.org/
    '@nuxt/image-edge', // https://v1.image.nuxtjs.org/
    '@nuxtjs/strapi', // https://strapi.nuxtjs.org/
    '@kevinmarrec/nuxt-pwa', // https://github.com/kevinmarrec/nuxt-pwa-module
  ],
  runtimeConfig: {
    strapi: {
      url: 'http://0.0.0.0:1337',
    },
    public: {
      baseUrl: 'http://localhost:3000',
      strapi: {
        url: 'http://localhost:1337',
      },
    },
  },
  css: [
    'primevue/resources/primevue.min.css',
    'primeicons/primeicons.css',
    'assets/css/fonts.css',
    'assets/css/theme.css',
    'animate.css/animate.min.css',
  ],
  build: {
    transpile: ['primevue'],
  },
  experimental: {
    reactivityTransform: true,
  },
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
  },
  server: {
    timing: true,
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },
  image: {
    strapi: {
      baseURL: 'http://localhost:133722/uploads/',
    },
  },
  pwa: {
    workbox: {
      enabled: false,
    },
    meta: {
      theme_color: '#0f172a',
      nativeUI: true,
    },
    manifest: {
      name: 'MyGarden',
      short_name: 'MyGarden',
      lang: 'en',
      useWebmanifestExtension: false,
      background_color: '#0f172a',
    },
  },
} as any)
