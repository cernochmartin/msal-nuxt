import type { PublicClientApplication } from '@azure/msal-browser'
import { useNuxtApp } from '#app'

export const useMsal = (): PublicClientApplication => {
  const nuxtApp = useNuxtApp()
  return nuxtApp.$msal as PublicClientApplication
}
