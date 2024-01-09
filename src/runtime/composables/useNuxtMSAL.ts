export const useNuxtMsal = (): any => {
    const { $msalClient } = useNuxtApp()
    
    navigateTo('https://login.microsoftonline.com', { external: true })

    return $msalClient

    
}