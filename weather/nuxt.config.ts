// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'shadcn-nuxt',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxt/icon',
  ],
  runtimeConfig:{
    apiBase: process.env.BASE_URL
  },
  colorMode: {
    classSuffix: ''
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './app/components/ui'
  },
  css:[
    '~/assets/styles/style.css',
    '~/assets/styles/tailwind.css',
    '~/assets/styles/themes.css',
    // '~/assets/styles/demo.css',
  ],
  i18n: {
    vueI18n: './app/i18n/i18n.config.ts',
    locales: ['en', 'ko'], // used in URL path prefix
    defaultLocale: 'en', // default locale of your project for Nuxt pages and routings
  },
})