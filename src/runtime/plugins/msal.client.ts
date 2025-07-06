import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { PublicClientApplication } from '@azure/msal-browser'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public.msal

  const msal = new PublicClientApplication({
    auth: {
      clientId: config.clientId,
      authority: config.authority,
      redirectUri: config.redirectUri
    }
  })

  console.log('[msal-nuxt] MSAL initialized')
  
  nuxtApp.provide('msal', msal) // ✅ Nuxt-native provide
})
