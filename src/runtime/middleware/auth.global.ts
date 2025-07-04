import { defineNuxtRouteMiddleware, useCookie, navigateTo } from '#app'

export default defineNuxtRouteMiddleware((to) => {
  const idToken = useCookie('msal_id_token')

  if (!idToken.value && to.path !== '/login') {
    return navigateTo('/login')
  }
})
