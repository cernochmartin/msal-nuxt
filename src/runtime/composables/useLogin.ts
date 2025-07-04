import { ref, onMounted } from 'vue'
import { useMsal } from './useMsal'

export const useLogin = () => {
  const loginFn = ref<() => Promise<any>>()

  onMounted(() => {
    const msal = useMsal()

    loginFn.value = async () => {
      try {
        const response = await msal.loginPopup({
          scopes: ['user.read'],
        })

        if (response?.account) {
          msal.setActiveAccount(response.account)
          document.cookie = `msal_id_token=${response.idToken}; path=/`
        }

        return response
      }
      catch (err) {
        console.error('Login failed:', err)
        throw err
      }
    }
  })

  const login = async () => {
    if (!loginFn.value) {
      console.warn('MSAL not ready yet or SSR context.')
      return null
    }
    return await loginFn.value()
  }

  return { login }
}
