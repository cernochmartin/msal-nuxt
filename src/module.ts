import { defineNuxtModule, addPlugin, createResolver, addImportsDir } from '@nuxt/kit'
import { fileURLToPath } from 'url'

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
        const resolver = createResolver(import.meta.url)
        const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

        addPlugin(resolver.resolve('./runtime/plugin'))

        addImportsDir(resolver.resolve(runtimeDir, 'composables'))
    }
})