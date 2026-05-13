<script setup lang="ts">
const auth = useMsalAuthentication()
const account = useAccount()
const tokenState = useMsalToken()
const msal = useMsal()

async function handleLogin() {
  await auth.login(['user.read', 'openid', 'profile'])
}

async function handleLoginRedirect() {
  await auth.loginRedirect(['user.read', 'openid', 'profile'])
}

async function handleLogoutRedirect() {
  auth.logoutRedirect()
}

async function handleTokenSilent() {
  const token = await tokenState.acquireTokenSilent(['user.read'])
  if (token) {
    console.log('[playground] Token acquired silently:', token.substring(0, 20) + '...')
  }
}

async function handleTokenPopup() {
  const token = await tokenState.acquireTokenPopup(['user.read'])
  if (token) {
    console.log('[playground] Token acquired via popup:', token.substring(0, 20) + '...')
  }
}

function listAccounts() {
  const all = msal.getAllAccounts()
  console.log('[playground] All accounts:', all)
  alert(`Found ${all.length} account(s). Check the console for details.`)
}

function truncate(str: string, len: number) {
  return str.length > len ? str.slice(0, len) : str
}
</script>

<template>
  <div class="container">
    <header>
      <h1>msal-nuxt</h1>
      <p class="subtitle">
        Microsoft Authentication Library for Nuxt 4
      </p>
    </header>

    <section class="card">
      <h2>Authentication</h2>
      <div class="row">
        <span
          class="pill"
          :class="auth.isAuthenticated.value ? 'pill--on' : 'pill--off'"
        >
          {{ auth.isAuthenticated.value ? 'signed in' : 'signed out' }}
        </span>
        <span
          v-if="auth.inProgress.value"
          class="pill pill--busy"
        >loading</span>
      </div>
      <div class="actions">
        <button
          :disabled="auth.inProgress.value"
          @click="handleLogin"
        >
          Login Popup
        </button>
        <button
          :disabled="auth.inProgress.value"
          @click="handleLoginRedirect"
        >
          Login Redirect
        </button>
        <button
          :disabled="!auth.isAuthenticated.value"
          @click="auth.logout()"
        >
          Logout
        </button>
        <button
          :disabled="!auth.isAuthenticated.value"
          @click="handleLogoutRedirect"
        >
          Logout Popup
        </button>
      </div>
      <p
        v-if="auth.error.value"
        class="error"
      >
        {{ auth.error.value.message }}
      </p>
    </section>

    <section class="card">
      <h2>Account</h2>
      <div v-if="account.account.value">
        <pre>{{ JSON.stringify(account.account.value, null, 2) }}</pre>
      </div>
      <p
        v-else
        class="dim"
      >
        No account loaded. Sign in first.
      </p>
      <button
        class="btn--dim"
        @click="account.loadAccounts()"
      >
        Reload
      </button>
    </section>

    <section class="card">
      <h2>Token</h2>
      <div class="actions">
        <button
          :disabled="!auth.isAuthenticated.value || tokenState.inProgress.value"
          @click="handleTokenSilent"
        >
          Acquire Silent
        </button>
        <button
          :disabled="!auth.isAuthenticated.value || tokenState.inProgress.value"
          @click="handleTokenPopup"
        >
          Acquire Popup
        </button>
      </div>
      <div
        v-if="tokenState.token.value"
        class="token-box"
      >
        <code>{{ truncate(tokenState.token.value, 64) }}…</code>
      </div>
      <p
        v-if="tokenState.error.value"
        class="error"
      >
        {{ tokenState.error.value.message }}
      </p>
    </section>

    <section class="card">
      <h2>MSAL Instance</h2>
      <p class="dim">
        Access via <code>useMsal()</code>
      </p>
      <button
        class="btn--dim"
        @click="listAccounts"
      >
        Log accounts to console
      </button>
    </section>

    <footer>msal-nuxt &middot; MIT</footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #020420;
  color: #fff;
  line-height: 1.6;
}

.container {
  max-width: 640px;
  margin: 0 auto;
  padding: 2.5rem 1rem;
}

header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.logo {
  width: 36px;
  height: 27px;
  margin-bottom: 0.5rem;
}

h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #00DC82;
  letter-spacing: -0.02em;
}

.subtitle {
  color: #64748b;
  font-size: 0.85rem;
  margin-top: 0.2rem;
}

.card {
  background: #0d1120;
  border: 1px solid #1e293b;
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 1rem;
}

.card h2 {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748b;
  margin-bottom: 0.75rem;
}

.row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.pill {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.15rem 0.6rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.pill--on {
  background: #002d1a;
  color: #00DC82;
}

.pill--off {
  background: #1e293b;
  color: #64748b;
}

.pill--busy {
  background: #1e1a00;
  color: #eab308;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

button {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.4rem 0.8rem;
  border: 1px solid #1e293b;
  border-radius: 6px;
  background: #0d1120;
  color: #fff;
  cursor: pointer;
  transition: all 0.15s;
}

button:hover:not(:disabled) {
  border-color: #00DC82;
  background: #001a0e;
  color: #00DC82;
}

button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.btn--dim {
  border-color: #1e293b;
  color: #64748b;
  margin-top: 0.75rem;
}

.btn--dim:hover:not(:disabled) {
  border-color: #00DC82;
  color: #00DC82;
  background: #001a0e;
}

.error {
  margin-top: 0.6rem;
  font-size: 0.8rem;
  color: #ef4444;
}

.dim {
  color: #64748b;
  font-size: 0.8rem;
}

.dim code {
  color: #00DC82;
  background: #001a0e;
  padding: 0 0.3rem;
  border-radius: 3px;
}

.token-box {
  margin-top: 0.75rem;
}

.token-box code {
  display: block;
  font-size: 0.7rem;
  background: #080c18;
  padding: 0.5rem;
  border-radius: 6px;
  word-break: break-all;
  color: #a5b4fc;
  border: 1px solid #1e293b;
}

pre {
  font-size: 0.7rem;
  background: #080c18;
  padding: 0.6rem;
  border-radius: 6px;
  overflow-x: auto;
  color: #a5b4fc;
  border: 1px solid #1e293b;
}

footer {
  text-align: center;
  font-size: 0.7rem;
  color: #334155;
  margin-top: 2.5rem;
}
</style>
