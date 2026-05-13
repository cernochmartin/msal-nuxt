import { ref } from 'vue'
import type { AccountInfo, AuthenticationResult, PopupRequest, RedirectRequest } from '@azure/msal-browser'
import { useMsal } from './useMsal'
import { useRuntimeConfig } from '#app'

export const useMsalAuthentication = () => {
  const msal = useMsal()
  const currentAccount = ref<AccountInfo | null>(null)
  const error = ref<Error | null>(null)
  const isAuthenticated = ref(false)
  const inProgress = ref(false)

  const login = async (scopes: string[] = ['user.read']): Promise<AuthenticationResult | null> => {
    inProgress.value = true
    error.value = null
    try {
      const request: PopupRequest = { scopes }
      const res = await msal.loginPopup(request)
      msal.setActiveAccount(res.account)
      currentAccount.value = res.account
      isAuthenticated.value = true
      return res
    }
    catch (err) {
      error.value = err as Error
      return null
    }
    finally {
      inProgress.value = false
    }
  }

  const loginRedirect = async (scopes: string[] = ['user.read']) => {
    inProgress.value = true
    error.value = null
    try {
      const request: RedirectRequest = { scopes }
      await msal.loginRedirect(request)
    }
    catch (err) {
      error.value = err as Error
      inProgress.value = false
    }
  }

  const logout = () => {
    const activeAccount = msal.getActiveAccount()
    const config = useRuntimeConfig()
    const msalConfig = config.public?.msal as { postLogoutRedirectUri?: string } | undefined
    msal.logout({
      account: activeAccount || undefined,
      postLogoutRedirectUri: msalConfig?.postLogoutRedirectUri || '/',
    })
    isAuthenticated.value = false
    currentAccount.value = null
  }

  const logoutRedirect = () => {
    const activeAccount = msal.getActiveAccount()
    msal.logoutPopup({ account: activeAccount || undefined }).catch(() => {})
    isAuthenticated.value = false
    currentAccount.value = null
  }

  const loadAccount = () => {
    const accounts = msal.getAllAccounts()
    if (accounts.length > 0) {
      currentAccount.value = accounts[0]
      msal.setActiveAccount(accounts[0])
      isAuthenticated.value = true
    }
    return currentAccount.value
  }

  const setAccount = (accountInfo: AccountInfo) => {
    msal.setActiveAccount(accountInfo)
    currentAccount.value = accountInfo
    isAuthenticated.value = true
  }

  return {
    account: currentAccount,
    error,
    isAuthenticated,
    inProgress,
    login,
    loginRedirect,
    logout,
    logoutRedirect,
    loadAccount,
    setAccount,
  }
}
