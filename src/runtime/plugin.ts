import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { PublicClientApplication } from '@azure/msal-browser'

export default defineNuxtPlugin(async (nuxtApp) => {
    const config = useRuntimeConfig().public

    const msalConfig = {
        auth: {
            clientId: config.CLIENT_ID,
            authority: 'https://login.microsoftonline.com',
            redirectUri: config.REDIRECT_URI,
            postLogoutRedirectUri: config.REDIRECT_URI,
            navigateToLoginRequestUrl: true,
        },
        cache: {
            cacheLocation: 'sessionStorage',
            storeAuthStateInCookie: false,
        }
    }

    const msalClient = new PublicClientApplication(msalConfig)
    nuxtApp.provide('msal-client', msalClient)
})
