<script setup lang="ts">
const login = useNuxtMSAL()
</script>
<template>
  <h1>MSAL Nuxt 3 Module</h1>
  <button @click="login">Click</button>
</template>
