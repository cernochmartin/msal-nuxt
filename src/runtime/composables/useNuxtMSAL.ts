export const useNuxtMsal = (): any => {
    const { $msalClient } = useNuxtApp()
    // add function to redirect to login
    return $msalClient
}