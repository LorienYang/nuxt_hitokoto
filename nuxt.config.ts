// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  sourcemap: false,

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    'nuxt-auth-utils'
  ],
  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },
  runtimeConfig:{
    DB_URL:''
  },
  css:[
      '~/assets/css/style.css',
      '~/assets/css/main.css'
  ],
/*  ui:{
    theme:{
      colors: [
          'pink',
          'red'
      ]
    }
  }*/
})