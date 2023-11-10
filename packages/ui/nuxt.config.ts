// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'formidable',
    '@nuxtjs/tailwindcss', // https://tailwindcss.nuxtjs.org/
    'nuxt-icon', // https://icones.js.org/
    '@pinia/nuxt', // https://pinia.vuejs.org/
    '@nuxtjs/strapi', // https://strapi.nuxtjs.org/
    '@vite-pwa/nuxt', // https://vite-pwa-org.netlify.app/
  ],
  runtimeConfig: {
    strapi: {
      url: 'http://0.0.0.0:1337',
    },
    public: {
      isDev: process.env.NODE_ENV !== 'production',
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
    head: {
      title: 'MyGarden',
      meta: [
        { name: 'description', content: 'Transform Your Green Thumb with this amazing Personal Plant Manager!' },
        { name: 'theme-color', content: '#0f172a' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/icon.png' },
        {
          rel: 'apple-touch-icon',
          href: '/icon.png',
          sizes: '180x180',
        },
        { rel: 'manifest', href: '/manifest.webmanifest' },
      ],
    },
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
  pwa: {
    injectRegister: 'inline',
    strategies: 'generateSW',
    workbox: {
      importScripts: ['/notifications-sw.js'],
      globPatterns: ['**/*.{js,css,png,jpg,jpeg,svg,gif,json,woff2,woff,eot,ttf}'],
      navigateFallback: null,
    },
    manifest: {
      name: 'MyGarden',
      short_name: 'MyGarden',
      lang: 'en',
      background_color: '#0f172a',
      start_url: '/my-plants',
      icons: [
        {
          src: '/icon.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
      ],
      theme_color: '#0f172a',
    },
    devOptions: {
      enabled: false,
    },
  },
  strapi: {
    cookie: {
      maxAge: 60 * 60 * 24 * 365,
    },
  },
} as any)
