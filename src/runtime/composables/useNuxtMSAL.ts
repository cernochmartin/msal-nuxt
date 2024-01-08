import { BrowserCacheLocation, EventType, PublicClientApplication } from '@azure/msal-browser'
import { useRuntimeConfig } from 'nuxt/app'

export const useNuxtMSAL = () => {
    const config = useRuntimeConfig()

    const msalConfig = {
        auth: {
            clientId: config.public.clientId,
            authority: 'https://login.microsoftonline.com',
            redirectUri: config.public.redirectUri,
        },
        cache: {
            cacheLocation: BrowserCacheLocation.LocalStorage,
            storeAuthStateInCookie: true,
        },
        system: {
            tokenRenewalOffsetSeconds: 300,
        }
    }

}