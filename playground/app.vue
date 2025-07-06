<script setup lang="ts">
const loginFn = ref<(() => Promise<any>) | null>(null)
const result = ref<any>(null)

onMounted(() => {
  const { login } = useLogin()
  loginFn.value = login
})

async function handleLogin() {
  if (!loginFn.value) return
  result.value = await loginFn.value()
  console.log('[Page] login result:', result.value)
}
</script>

<template>
  <button @click="handleLogin">Login with Microsoft</button>
  <pre>{{ result }}</pre>
</template>
