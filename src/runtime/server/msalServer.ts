import { jwtDecode } from 'jwt-decode'

export interface JwtPayload {
  sub?: string
  aud?: string
  iss?: string
  exp?: number
  iat?: number
  [key: string]: unknown
}

export const getUserFromToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwtDecode<JwtPayload>(token)
    return decoded
  }
  catch (err) {
    console.error('[msal-nuxt] Invalid token:', err)
    return null
  }
}

export const isTokenExpired = (token: string): boolean => {
  const payload = getUserFromToken(token)
  if (!payload || !payload.exp) return true
  return Date.now() >= payload.exp * 1000
}
