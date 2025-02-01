export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['../src/module'],

  msal: {
    clientId: '',
    redirectUri: ''
  },

  runtimeConfig: {
    public: {
      CLIENT_ID: process.env.CLIENT_ID,
      REDIRECT_URI: process.env.REDIRECT_URI
    }
  },

  compatibilityDate: '2025-02-01'
})