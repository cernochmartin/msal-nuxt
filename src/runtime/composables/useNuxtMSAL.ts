import { BrowserCacheLocation, EventType, PublicClientApplication } from '@azure/msal-browser'
import { useRuntimeConfig } from 'nuxt/app'

export const useNuxtMSAL = () => {
    const config = useRuntimeConfig()

    console.log('lol')
    const msalConfig = {
        auth: {
            clientId: config.public.CLIENT_ID,
            authority: 'https://login.microsoftonline.com',
            redirectUri: config.public.REDIRECT_URI,
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