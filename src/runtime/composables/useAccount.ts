import { ref, readonly } from 'vue'
import type { AccountInfo } from '@azure/msal-browser'
import { useMsal } from './useMsal'

export const useAccount = () => {
  const msal = useMsal()
  const account = ref<AccountInfo | null>(null)

  const loadAccounts = (): AccountInfo | null => {
    const accounts = msal.getAllAccounts()
    if (accounts.length === 0) {
      account.value = null
      return null
    }
    account.value = accounts[0]!
    msal.setActiveAccount(accounts[0]!)
    return accounts[0]!
  }

  const setActiveAccount = (accountInfo: AccountInfo | null) => {
    if (accountInfo) {
      msal.setActiveAccount(accountInfo)
      account.value = accountInfo
    }
  }

  loadAccounts()

  return {
    account: readonly(account),
    loadAccounts,
    setActiveAccount,
  }
}
