import { ref, onMounted } from 'vue'
import { useMsal } from './useMsal'

export const useAccount = () => {
  const msal = useMsal()
  const account = ref(null)

  onMounted(() => {
    const accounts = msal.getAllAccounts()
    if (accounts.length > 0) {
      account.value = accounts[0]
      msal.setActiveAccount(accounts[0])
    }
  })

  return { account }
}