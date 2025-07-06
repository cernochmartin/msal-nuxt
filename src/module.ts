import { defineNuxtModule, addPlugin, addImportsDir, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  meta: { name: 'msal-nuxt', configKey: 'msal' },
  setup(_, nuxt) {
    const resolver = createResolver(import.meta.url)
    addPlugin(resolver.resolve('./runtime/plugins/msal.client'))
    addImportsDir(resolver.resolve('./runtime/composables'))
  }
})
