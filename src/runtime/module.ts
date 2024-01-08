import { defineNuxtModule } from '@nuxt/kit'

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
        authority: '',
        clientId: '',
        redirectUri: ''
    },
    setup(options, nuxt) {
        
    }
})