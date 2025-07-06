export const useMsal = () => {
  const { $msal } = useNuxtApp()

  if (!$msal) {
    throw new Error('[msal-nuxt] MSAL instance not found. Did you install the plugin?')
  }

  return $msal
}
