import { inject } from 'vue'

export const useMsal = () => {
  const msal = inject('msal')

  if (!msal) {
    throw new Error('MSAL instance not found. Did you forget to install the module?')
  }

  return msal
}
