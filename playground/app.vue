<script setup lang="ts">
let login: () => void

onMounted(() => {
  login = useLogin().login
})

const signIn = async () => {
  const result = await login()
  console.log(result)
}
</script>

<template>
  <button @click="signIn">Login with Microsoft</button>
</template>