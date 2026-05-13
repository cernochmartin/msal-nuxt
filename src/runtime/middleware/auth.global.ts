import { defineNuxtRouteMiddleware, useCookie, navigateTo, useRuntimeConfig } from '#app'

export default defineNuxtRouteMiddleware((to) => {
  const config = useRuntimeConfig()
  const msalConfig = config.public?.msal as {
    navigateToLogin?: boolean
    loginRoute?: string
  } | undefined

  if (!msalConfig?.navigateToLogin) {
    return
  }

  const idToken = useCookie('msal_id_token')

  if (!idToken.value && to.path !== (msalConfig?.loginRoute || '/login')) {
    return navigateTo(msalConfig?.loginRoute || '/login')
  }
})
