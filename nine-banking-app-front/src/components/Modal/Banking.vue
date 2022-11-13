<script setup>
import { ref } from "vue";
defineEmits([
  "closeModal",
  "withdrawBalance",
  "depositBalance",
  "transferBalance",
]);
const props = defineProps({
  selectedAccount: {
    type: Object,
  },
  depositMode: {
    type: Boolean,
  },
  withdrawMode: {
    type: Boolean,
  },
  transferMode: {
    type: Boolean,
  },
});
const amount = ref();
const toId = ref();
const validateDecimal = () => {
  if (amount.value > 0) {
    if (/[0-9]?[0-9]?(\.[0-9][0-9]?)?/.test(amount.value)) {
      amount.value = parseFloat(amount.value).toFixed(2);
    }
  }
};

</script>

<template>
  <div
    id="delete-modal"
    class="flex h-screen overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full bg-black bg-opacity-50 openTransition"
    @click="$emit('closeModal')"
  >
    <div
      @click.stop
      class="m-auto relative p-4 w-full max-w-xl h-full md:h-auto"
    >
      <div class="relative bg-white rounded-lg shadow">
        <button
          @click="$emit('closeModal')"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
        >
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>

        <div class="p-6 text-center">
          <div v-if="props.transferMode" class="text-2xl">โอนเงิน</div>
          <div v-else class="text-2xl">
            {{ props.depositMode ? "ฝากเงิน" : "ถอนเงิน" }}
          </div>
          <div class="mb-2">
            <input
              type="number"
              v-model="toId"
              placeholder="เลขบัญชีที่ต้องการโอน"
              v-if="props.transferMode"
              class="swal2-input"
              required
            />
            <input
              type="number"
              v-model="amount"
              @input="validateDecimal"
              placeholder="จำนวนเงิน"
              class="swal2-input"
              step="0.01"
              min="0"
              required
            />
          </div>
          <button
            v-if="props.depositMode || props.withdrawMode"
            @click="
              props.depositMode
                ? [$emit('depositBalance', amount), $emit('closeModal')]
                : [$emit('withdrawBalance', amount), $emit('closeModal')]
            "
            :class="{
              'bg-green-600 hover:bg-green-400': props.depositMode,
              'bg-red-600 hover:bg-red-400': props.withdrawMode,
            }"
            class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          >
            {{ props.depositMode ? "ฝากเงิน" : "ถอนเงิน" }}
          </button>
          <button
            v-if="props.transferMode"
            @click="
              $emit('transferBalance', { toId: toId, amount: amount }),
                $emit('closeModal')
            "
            class="text-white bg-sky-600 hover:bg-sky-400 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          >
            โอนเงิน
          </button>
          <button
            @click="$emit('closeModal')"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
