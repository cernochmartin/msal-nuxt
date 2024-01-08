import module from '..'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [module],
  msal: {
    authority: '',
    clientId: '',
    redirectUri: ''
  }
})
