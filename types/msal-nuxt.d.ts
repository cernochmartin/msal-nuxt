import { PublicClientApplication } from '@azure/msal-browser'

declare module '#app' {
  interface NuxtApp {
    $msal: PublicClientApplication
  }

  interface NuxtRuntimeConfig {
    public: {
      msal: {
        clientId: string
        authority: string
        redirectUri: string
      }
    }
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $msal: PublicClientApplication
  }
}
