export const useMsalLogout = (): any => {
    const { $msalClient } = useNuxtApp()

    return $msalClient
}