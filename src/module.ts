import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

export interface ModuleOptions {
    authority: string
    clientId: string
    redirectUri: string
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: 'nuxt-msal',
        configKey: 'msal',
        compatibility: {
          nuxt: '^3.0.0',
        }
    },
    defaults: {
        authority: 'https://login.microsoftonline.com',
        clientId: '',
        redirectUri: ''
    },
    setup(options, nuxt) {
        const { resolve } = createResolver(import.meta.url)

        addPlugin(resolve('./runtime/plugin'))
    }
})