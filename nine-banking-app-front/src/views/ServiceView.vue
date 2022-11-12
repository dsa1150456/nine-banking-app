<script setup>
import Transaction from "../components/Transaction.vue";
import Service from "../components/Service.vue";

</script>

<template>
  <div
    class="container w-screen h-[80vh] bg-no-repeat bg-cover bg-center flex flex-wrap items-center justify-center gap-2"
  >
    <div class="bg-white rounded-3xl h-5/6 w-7/12 flex shadow-lg">
      <Transaction />
    </div>
    <div class="bg-white rounded-3xl h-5/6 w-4/12 flex shadow-lg px-2.5">
      <Service/>
    </div>
  </div>
</template>

<style></style>
