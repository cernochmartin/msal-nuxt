import { PublicClientApplication } from '@azure/msal-browser'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public.msal

  const msalInstance = new PublicClientApplication({
    auth: {
      clientId: config.clientId,
      authority: config.authority,
      redirectUri: config.redirectUri || window.location.origin,
    },
  })

  return {
    provide: {
      msal: msalInstance,
    },
  }
})
