import { ref } from 'vue'
import type { AccountInfo, SilentRequest } from '@azure/msal-browser'
import { useMsal } from './useMsal'

export const useMsalToken = () => {
  const msal = useMsal()
  const token = ref<string | null>(null)
  const error = ref<Error | null>(null)
  const inProgress = ref(false)

  const acquireTokenSilent = async (scopes: string[], account?: AccountInfo | null): Promise<string | null> => {
    inProgress.value = true
    error.value = null
    try {
      const activeAccount = account || msal.getActiveAccount()
      if (!activeAccount) {
        throw new Error('No active account found. User must sign in first.')
      }
      const request: SilentRequest = { scopes, account: activeAccount }
      const res = await msal.acquireTokenSilent(request)
      token.value = res.accessToken
      return res.accessToken
    }
    catch (err) {
      error.value = err as Error
      token.value = null
      return null
    }
    finally {
      inProgress.value = false
    }
  }

  const acquireTokenPopup = async (scopes: string[], account?: AccountInfo | null): Promise<string | null> => {
    inProgress.value = true
    error.value = null
    try {
      const activeAccount = account || msal.getActiveAccount()
      const res = await msal.acquireTokenPopup({ scopes, account: activeAccount || undefined })
      token.value = res.accessToken
      return res.accessToken
    }
    catch (err) {
      error.value = err as Error
      token.value = null
      return null
    }
    finally {
      inProgress.value = false
    }
  }

  return {
    token,
    error,
    inProgress,
    acquireTokenSilent,
    acquireTokenPopup,
  }
}
