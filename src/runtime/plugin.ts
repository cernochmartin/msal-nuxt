import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { useNuxtMSAL } from './composables/useNuxtMSAL'

export default defineNuxtPlugin(async (nuxtApp) => {
    const config = useRuntimeConfig()

    const auth = useNuxtMSAL()
})
