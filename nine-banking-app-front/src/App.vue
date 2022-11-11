<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="app">
    <Navbar />
    <router-view />
  </div>
</template>

<style scoped>
* {
  font-family: "Noto Sans Thai", sans-serif;
}
.app {
  @apply bg-gray-50;
  min-height: 100vh;
  @media (min-width: 900px) {
    flex-direction: row !important;
  }
}
</style>
