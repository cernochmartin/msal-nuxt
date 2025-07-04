import { defineNuxtModule, addPlugin, createResolver, addImportsDir } from '@nuxt/kit'

export interface ModuleOptions {
  auth: {
    clientId: string
    authority?: string
    redirectUri?: string
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'msal-nuxt',
    configKey: 'msal',
  },

  defaults: {
    auth: {
      clientId: '',
      authority: 'https://login.microsoftonline.com/common',
      redirectUri: '',
    },
  },

  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.msal = options.auth

    addPlugin(resolver.resolve('./runtime/plugins/msal.client'))
    addImportsDir(resolver.resolve('./runtime/composables'))
    // nuxt.options.router.middleware.push(resolver.resolve('./runtime/middleware'))
  },
})
