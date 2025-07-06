export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      msal: {
        clientId: '2dc5869f-3859-4e2d-999c-dbe1a1a1eb54',
        authority: 'https://login.microsoftonline.com/5edad84d-ad70-49a5-9c32-822f48b84de6',
        redirectUri: 'http://localhost:3000'
      }
    }
  }
})
