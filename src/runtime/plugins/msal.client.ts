import { PublicClientApplication, LogLevel } from '@azure/msal-browser'
import type { Configuration } from '@azure/msal-browser'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin({
  name: 'msal-nuxt',
  enforce: 'pre',
  setup() {
    const config = useRuntimeConfig()
    const msalConfig = config.public?.msal as {
      clientId?: string
      authority?: string
      redirectUri?: string
      postLogoutRedirectUri?: string
      cacheLocation?: string
      storeAuthStateInCookie?: boolean
    } | undefined

    const msalConfiguration: Configuration = {
      auth: {
        clientId: msalConfig?.clientId || '',
        authority: msalConfig?.authority || 'https://login.microsoftonline.com/common',
        redirectUri: msalConfig?.redirectUri,
        postLogoutRedirectUri: msalConfig?.postLogoutRedirectUri || msalConfig?.redirectUri,
      },
      cache: {
        cacheLocation: (msalConfig?.cacheLocation as 'sessionStorage' | 'localStorage') || 'sessionStorage',
        storeAuthStateInCookie: msalConfig?.storeAuthStateInCookie || false,
      },
      system: {
        loggerOptions: {
          loggerCallback: () => {},
          logLevel: LogLevel.Info,
          piiLoggingEnabled: false,
        },
      },
    }

    const msalInstance = new PublicClientApplication(msalConfiguration)

    return {
      provide: {
        msal: msalInstance,
      },
    }
  },
})
