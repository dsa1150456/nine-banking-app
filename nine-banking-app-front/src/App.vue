<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="app">
    <Navbar />
    <router-view />
  </div>
</template>

<style>
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
.scroll::-webkit-scrollbar-thumb {
  border-radius: 1px;
  @apply bg-[#7474fc];
}

.scroll::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: transparent;
}

.scroll::-webkit-scrollbar {
  width: 3px;
  background-color: transparent;
}
</style>
