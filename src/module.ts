import { defineNuxtModule, addPlugin, addImportsDir, addTemplate, createResolver } from '@nuxt/kit'
import { defu } from 'defu'

export default defineNuxtModule({
  meta: {
    name: 'msal-nuxt',
    configKey: 'msal',
    compatibility: { nuxt: '^3.0.0' },
  },
  defaults: {
    auth: {
      clientId: '',
      authority: 'https://login.microsoftonline.com/common',
      redirectUri: '',
      postLogoutRedirectUri: '',
      navigateToLogin: true,
      loginRoute: '/login',
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: false,
    },
    system: {
      loggerOptions: {
        loggerCallback: null,
        logLevel: 'Info',
      },
    },
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.msal = defu(
      nuxt.options.runtimeConfig.public.msal || {},
      {
        clientId: options.auth.clientId,
        authority: options.auth.authority,
        redirectUri: options.auth.redirectUri,
        postLogoutRedirectUri: options.auth.postLogoutRedirectUri,
        cacheLocation: options.cache.cacheLocation,
        storeAuthStateInCookie: options.cache.storeAuthStateInCookie,
        navigateToLogin: options.auth.navigateToLogin,
        loginRoute: options.auth.loginRoute,
      },
    )

    addPlugin(resolver.resolve('./runtime/plugins/msal.client'))

    addImportsDir(resolver.resolve('./runtime/composables'))

    addTemplate({
      filename: 'types/msal-nuxt.d.ts',
      getContents: () => `import type { PublicClientApplication, AccountInfo } from '@azure/msal-browser'

declare module '#app' {
  interface NuxtApp {
    $msal: PublicClientApplication
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $msal: PublicClientApplication
  }
}

export {}
`,
    })
  },
})
