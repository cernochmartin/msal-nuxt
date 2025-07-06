import { ref, onMounted } from 'vue'
import { useMsal } from './useMsal'

export const useLogin = () => {
  const loginFn = ref<() => Promise<any>>()

  onMounted(() => {
    const msal = useMsal()
    loginFn.value = async () => {
      console.log('[useLogin] launching loginPopup...')
      const res = await msal.loginPopup({ scopes: ['user.read'] })
      console.log('[useLogin] response:', res)
      return res
    }
  })

  const login = async () => {
    if (!loginFn.value) {
      console.warn('[useLogin] login not initialized')
      return null
    }
    return loginFn.value()
  }

  return { login }
}
