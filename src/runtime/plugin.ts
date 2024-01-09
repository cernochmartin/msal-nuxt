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

    async function initialize() {
        await msalClient.value.initialize()

        await msalClient.value
            .handleRedirectPromise() 
            .then(handleResponse)
            .catch((err) => {
                throw new Error(err)
            });

        msalClient.value.addEventCallback((event) => {
            if (event.eventType === EventType.LOGIN_SUCCESS) {
                setupTokenExpirationTimer()
            }
        })

    }

    function handleResponse(resp: any) {
        if (resp?.account) {
            setupTokenExpirationTimer()
        } else {
            console.log('login')
        }
    }

    return initialize

    nuxtApp.provide('msal-client', msalClient)
})
