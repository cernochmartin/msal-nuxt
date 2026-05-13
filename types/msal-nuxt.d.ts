import type { PublicClientApplication } from '@azure/msal-browser'

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
        postLogoutRedirectUri?: string
        cacheLocation?: string
        storeAuthStateInCookie?: boolean
        navigateToLogin?: boolean
        loginRoute?: string
      }
    }
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $msal: PublicClientApplication
  }
}

export {}
