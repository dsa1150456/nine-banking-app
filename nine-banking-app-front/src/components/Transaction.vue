<script setup>
import moment from "moment-timezone";
const props = defineProps({
  selectedAccount: {
    type: Object,
  },
  transactions: {
    type: Array,
  },
});
</script>

<template>
  <div class="flex flex-col p-10 min-w-full">
    <div class="text-sm md:text-lg lg:text-lg flex justify-between">
      <span class="text-gray-700">ประวัติการทำธุรกรรม</span>
    </div>
    <div class="scroll flex flex-col gap-2 overflow-x-auto min-w-full mt-5">
      <div
        v-for="transaction in props.transactions"
        class="flex flex-col rounded-lg border shadow-md bg-white md:max-w-2xl"
      >
        <div class="md:flex">
          <div class="md:shrink-0">
            <div
              class="flex items-center justify-center h-48 w-full object-cover md:h-full md:w-48 md:rounded-l font-bold"
              :class="{
                'bg-green-200 text-green-600': transaction.transaction_type == 'deposit'
                 || (transaction.transaction_type == 'transfer' && transaction.from_account_id != props.selectedAccount.accountid),
                'bg-red-200 text-red-600': transaction.transaction_type == 'withdraw'
                 || (transaction.transaction_type == 'transfer' && transaction.from_account_id == props.selectedAccount.accountid),
                }"
            >
              <span>{{ transaction.transaction_type == 'deposit' ||
                       transaction.transaction_type == 'transfer' &&
                       transaction.from_account_id != props.selectedAccount.accountid ? "+" + transaction.transaction_amount : "-" + transaction.transaction_amount
              }}</span>
            </div>
          </div>
          <div class="p-8">
            <div
              class="uppercase tracking-wide text-sm text-indigo-500 font-semibold"
            >
              {{ transaction.transaction_type }}
            </div>
            <p
              v-if="transaction.to_account_id != null"
              class="block mt-1  leading-tight font-normal text-black"
            >
            <div>
              เลขบัญชีที่โอน :{{
                transaction.from_account_id
              }}</div>
              <div>เลขบัญชีที่ได้รับ :{{ transaction.to_account_id }}</div>
            </p>
            <p class="mt-2 text-slate-500">
              {{ moment(transaction.transaction_time).format("LLL") }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
