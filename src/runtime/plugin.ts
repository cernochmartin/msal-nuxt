import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { PublicClientApplication, EventType } from '@azure/msal-browser'

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

    const msalClient = useState('msalClient', () => new PublicClientApplication(msalConfig))

    async function login() {
        await msalClient.value.loginRedirect()
    }

    async function logOut() {
        await msalClient.value.logoutRedirect()
    }

    return nuxtApp.provide('login', login)
})
