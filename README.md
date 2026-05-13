# msal-nuxt

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Microsoft Authentication Library (MSAL) integration for Nuxt 4. Provides composables and a plugin to authenticate users via Azure AD / Microsoft Entra ID using `@azure/msal-browser`.

## Features

- MSAL `PublicClientApplication` initialized automatically as a Nuxt plugin
- Popup and redirect login flows
- Silent token acquisition with automatic refresh
- Reactive account state
- Optional global route guard middleware
- Server-side JWT decoding utility
- Full TypeScript support

## Quick Setup

### 1. Install

```bash
npm install msal-nuxt @azure/msal-browser
```

Or with pnpm:

```bash
pnpm add msal-nuxt @azure/msal-browser
```

### 2. Add to `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ['msal-nuxt'],
  msal: {
    auth: {
      clientId: 'your-azure-client-id',
      authority: 'https://login.microsoftonline.com/your-tenant-id',
      redirectUri: 'http://localhost:3000'
    }
  }
})
```

> All config is also settable via `runtimeConfig.public.msal.*` for environment variable overrides.

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `auth.clientId` | `string` | `''` | Azure AD application (client) ID |
| `auth.authority` | `string` | `'https://login.microsoftonline.com/common'` | Azure AD authority URL |
| `auth.redirectUri` | `string` | `''` | Redirect URI after login |
| `auth.postLogoutRedirectUri` | `string` | `redirectUri` | Redirect URI after logout |
| `auth.navigateToLogin` | `boolean` | `true` | Enable global route guard |
| `auth.loginRoute` | `string` | `'/login'` | Route path for login page (for guard) |
| `cache.cacheLocation` | `'sessionStorage' \| 'localStorage'` | `'sessionStorage'` | Browser storage for tokens |
| `cache.storeAuthStateInCookie` | `boolean` | `false` | Store auth state in cookies (for IE) |

## Composables

All composables are auto-imported when the module is installed.

### `useMsal()`

Returns the raw `PublicClientApplication` instance from `@azure/msal-browser`.

```ts
const msal = useMsal()
const accounts = msal.getAllAccounts()
```

### `useMsalAuthentication()`

Primary composable for authentication flows.

```ts
const {
  account,           // Ref<AccountInfo | null> - currently active account
  error,             // Ref<Error | null> - last auth error
  isAuthenticated,   // Ref<boolean> - whether user is signed in
  inProgress,        // Ref<boolean> - whether an auth operation is in flight
  login,             // (scopes?: string[]) => Promise<AuthenticationResult | null>
  loginRedirect,     // (scopes?: string[]) => Promise<void>
  logout,            // () => void
  logoutRedirect,    // () => void
  loadAccount,       // () => AccountInfo | null
  setAccount         // (account: AccountInfo) => void
} = useMsalAuthentication()
```

**Examples:**

```ts
// Popup login
const { login, logout, isAuthenticated, account } = useMsalAuthentication()

async function signIn() {
  const result = await login(['user.read', 'openid'])
  console.log('Signed in as', result?.account?.username)
}

function signOut() {
  logout()
}
```

```ts
// Redirect login
const { loginRedirect } = useMsalAuthentication()

// Call on your login page
await loginRedirect(['user.read'])

// Handle the redirect result on mount (msal-nuxt handles this internally)
```

### `useMsalToken()`

Acquire access tokens silently or via popup.

```ts
const {
  token,               // Ref<string | null> - the access token
  error,               // Ref<Error | null>
  inProgress,          // Ref<boolean>
  acquireTokenSilent,  // (scopes: string[], account?: AccountInfo | null) => Promise<string | null>
  acquireTokenPopup    // (scopes: string[], account?: AccountInfo | null) => Promise<string | null>
} = useMsalToken()
```

**Example:**

```ts
const { acquireTokenSilent } = useMsalToken()

async function fetchWithAuth() {
  const token = await acquireTokenSilent(['api://my-api/access'])
  if (!token) return
  const res = await fetch('/api/data', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.json()
}
```

### `useAccount()`

Reactive account state.

```ts
const {
  account,         // Readonly<Ref<AccountInfo | null>>
  loadAccounts,    // () => AccountInfo | null
  setActiveAccount // (account: AccountInfo | null) => void
} = useAccount()
```

## Server Utilities

Import from `msal-nuxt/runtime/server/msalServer`:

```ts
import { getUserFromToken, isTokenExpired } from 'msal-nuxt/runtime/server/msalServer'

// Decode without verifying (does NOT validate signature)
const payload = getUserFromToken(token)
// Check expiry
const expired = isTokenExpired(token)
```

> Token signature verification should be done server-side using the Azure AD JWKS endpoint. These utilities only decode and check expiry.

## Route Guard

The module includes an optional global route middleware (`auth.global.ts`). It is **disabled by default** unless you set `auth.navigateToLogin: true` in config AND a cookie named `msal_id_token` is expected.

To enable full route protection, set up your `nuxt.config.ts`:

```ts
msal: {
  auth: {
    navigateToLogin: true,
    loginRoute: '/login'
  }
}
```

The guard checks for a cookie named `msal_id_token`. Users without it are redirected to the configured login route.

## TypeScript

Module augments `#app` and `vue` globally — `$msal` is available on `NuxtApp` and component instances with full typing.

```ts
// Access via Nuxt plugin
const { $msal } = useNuxtApp()

// Access via template (if needed)
// {{ $msal }}
```

## Local Development

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm dev:prepare

# Develop with the playground
pnpm dev

# Run tests
pnpm test

# Type checking
pnpm test:types

# Build for production
pnpm prepack
```

## License

[MIT](./LICENSE)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/msal-nuxt/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/msal-nuxt

[npm-downloads-src]: https://img.shields.io/npm/dm/msal-nuxt.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/msal-nuxt

[license-src]: https://img.shields.io/npm/l/msal-nuxt.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/msal-nuxt

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
