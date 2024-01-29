export const useMsalLogin = (): any => {
    const { $login } = useNuxtApp()

    return $login
}