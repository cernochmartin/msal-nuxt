import jwtDecode from 'jwt-decode'

export const getUserFromToken = (token: string) => {
  try {
    const decoded: string = jwtDecode(token)
    return decoded
  }
  catch (err) {
    console.error('Invalid token:', err)
    return null
  }
}
