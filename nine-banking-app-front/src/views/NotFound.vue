<script setup>
import { useRouter } from "vue-router";
const appRouter = useRouter();
const goHome = () => appRouter.push({ name: "home" });
</script>

<template>
  <header>
    <div class="flex" style="height: 80vh">
      <div class="m-auto text-center">
        <div>
          <h3 class="text-4xl text-gray-700">Oops!</h3>
          <h2 class="font-bold text-9xl text-glow">404</h2>
          <h4 class="text-4xl text-gray-700">Page Not Found</h4>
        </div>
        <div class="text-base text-gray-700 mt-3">
          <p>It seems you've ventured too far.</p>
        </div>
        <button
          class="mx-auto lg:mx-0 bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transition hover:scale-105 duration-300 ease-in-out"
          @click="goHome"
        >
          Home
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
@keyframes glowing {
  0% {
    text-shadow: 0 0 -10px;
    @apply text-[#7474fc];
  }
  40% {
    text-shadow: 0 0 20px;
    @apply text-[#7474fc];
  }
  60% {
    text-shadow: 0 0 20px;
    @apply text-[#7474fc];
  }
  100% {
    text-shadow: 0 0 -10px;
    @apply text-[#7474fc];
  }
}

.text-glow {
  animation: glowing 5000ms infinite;
}
</style>
