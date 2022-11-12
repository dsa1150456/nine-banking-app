<script setup></script>

<template>
  <div class="flex flex-col p-10 min-w-full">
    <div class="text-sm md:text-lg lg:text-lg flex justify-between">
      <span class="text-gray-700">Transaction History</span>
    </div>
    <div class="scroll flex flex-col gap-2 overflow-x-auto min-w-full mt-5">
      <div
        v-for="n in 10"
        class="flex flex-col rounded-lg border shadow-md bg-white md:max-w-2xl"
      >
        <div class="md:flex">
          <div class="md:shrink-0">
            <div
              class="flex items-center justify-center h-48 w-full object-cover md:h-full md:w-48 md:rounded-l bg-purple-100"
            >
              <span>500 บาท</span>
            </div>
          </div>
          <div class="p-8">
            <div
              class="uppercase tracking-wide text-sm text-indigo-500 font-semibold"
            >
              โอนเงิน
            </div>
            <p class="block mt-1 text-lg leading-tight font-medium text-black">
              เลข Transaction
            </p>
            <p class="mt-2 text-slate-500">11/12/2022 3:24PM</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
