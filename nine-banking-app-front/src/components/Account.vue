<script setup>
import { toRef, ref, computed } from "vue";
import axios from "axios";
import config from "@/config";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
import Banking from "./Modal/Banking.vue";
const emit = defineEmits(["createAccount", "getAccountDataSelected"]);
const props = defineProps({
  accounts: {
    type: Array,
  },
  selectedAccount: {
    type: Object,
    default: {},
  },
});
const interest = computed(() => {
  const interestPerYear = (props.selectedAccount.balance * 0.02 * 180) / 365;
  return interestPerYear.toFixed(2);
});

const selectedAccountId = computed(() => {
  return {
    accountid: props.selectedAccount.accountid,
  };
});

const openModal = ref(false);
const depositMode = ref(false);
const withdrawMode = ref(false);
const transferMode = ref(false);
const setMode = () => {
  depositMode.value = false;
  transferMode.value = false;
  withdrawMode.value = false;
};
const depositBalance = async (amount) => {
  await axios
    .post(`${config.apiUrl}/transactions`, {
      from_account_id: props.selectedAccount.accountid,
      transaction_type: "deposit",
      transaction_amount: parseFloat(amount),
    })
    .then((response) =>
      Swal.fire({
        text:
          "ฝากเงินทั้งหมด " +
          amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +
          " บาท",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          emit("getAccountDataSelected", selectedAccountId.value.accountid);
        }
      })
    )
    .catch((error) => {
      Swal.fire({ text: "เกิดข้อผิดพลาด", icon: "error" });
      console.log(error);
    });
};

const withdrawBalance = async (amount) => {
  console.log(amount);
  await axios
    .post(`${config.apiUrl}/transactions`, {
      from_account_id: props.selectedAccount.accountid,
      transaction_type: "withdraw",
      transaction_amount: parseFloat(amount),
    })
    .then((response) =>
      Swal.fire({
        text:
          "ถอนเงินทั้งหมด " +
          amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +
          " บาท",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          emit("getAccountDataSelected", selectedAccountId.value.accountid);
        }
      })
    )
    .catch((error) => {
      Swal.fire({ text: "เกิดข้อผิดพลาด", icon: "error" });
      console.log(error);
    });
};

const transferBalance = async (payload) => {
  await axios
    .post(`${config.apiUrl}/transactions`, {
      from_account_id: props.selectedAccount.accountid,
      to_account_id: parseInt(payload.toId),
      transaction_type: "transfer",
      transaction_amount: parseFloat(payload.amount),
    })
    .then((response) =>
      Swal.fire({
        text:
          "โอนเงินทั้งหมด " +
          payload.amount
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +
          " บาท",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          emit("getAccountDataSelected", selectedAccountId.value.accountid);
        }
      })
    )
    .catch((error) => {
      Swal.fire({ text: error.response.data.message, icon: "error" });
    });
};
</script>

<template>
  <div class="flex flex-col p-10 min-w-full">
    <div
      v-if="props.accounts.length == 0"
      class="flex flex-col justify-center items-center mb-2"
    >
      <button
        @click="$emit('createAccount')"
        class="w-full text-red-400 hover:text-red-800 font-bold py-2 px-4 rounded inline-flex flex-col items-center"
      >
        <span>คุณยังไม่มีบัญชีคลิ้กเพื่อเปิดบัญชี</span>
      </button>
    </div>
    <div v-else>
      <div class="flex flex-row justify-center items-center mb-2">
        เลขบัญชี :
        <select
          v-if="props.accounts"
          class="ml-1 border border-gray-400 hover:border-gray-500 rounded shadow focus:outline-none focus:border-[#2929a8]"
          v-model="selectedAccountId.accountid"
          @change="$emit('getAccountDataSelected', selectedAccountId.accountid)"
        >
          <option v-for="account in props.accounts" :value="account.accountid">
            {{ account.accountid }}
          </option>
        </select>
        <button
          @click="$emit('createAccount')"
          class="ml-2 text-green-400 hover:text-green-800 font-bold"
        >
          <span>+</span>
        </button>
      </div>
    </div>
    <div
      v-if="props.accounts.length != 0"
      class="aspect-square border rounded-full flex flex-col justify-center items-center mb-2"
    >
      <div class="text-sm">ยอดเงินคงเหลือ</div>
      <div class="text-lg">{{ props.selectedAccount.balance }}</div>
      <div class="text-xs text-green-500">
        ดอกเบี้ยต่อปี +{{ interest }} บาท
      </div>
    </div>
    <div
      v-if="props.accounts.length != 0"
      class="scroll flex flex-col justify-center items-center gap-3"
    >
      <Banking
        v-if="openModal"
        @closeModal="(openModal = !openModal), setMode()"
        :selectedAccount="selectedAccount"
        @depositBalance="depositBalance($event)"
        @withdrawBalance="withdrawBalance($event)"
        @transferBalance="transferBalance($event)"
        :depositMode="depositMode"
        :withdrawMode="withdrawMode"
        :transferMode="transferMode"
      />
      <button
        @click="(openModal = true), (depositMode = true)"
        class="w-full bg-green-300 hover:bg-green-400 text-gray-700 font-bold py-2 px-4 rounded inline-flex flex-col items-center"
      >
        <span class="material-symbols-outlined"> download </span>
        <span>ฝากเงิน</span>
      </button>
      <button
        @click="(openModal = true), (withdrawMode = true)"
        class="w-full bg-red-300 hover:bg-red-400 text-gray-700 font-bold py-2 px-4 rounded inline-flex flex-col items-center"
      >
        <span class="material-symbols-outlined"> payments </span>
        <span>ถอนเงิน</span>
      </button>
      <button
        @click="(openModal = true), (transferMode = true)"
        class="w-full bg-sky-300 hover:bg-sky-400 text-gray-700 font-bold py-2 px-4 rounded inline-flex flex-col items-center"
      >
        <span class="material-symbols-outlined"> compare_arrows </span>
        <span>โอนเงิน</span>
      </button>
    </div>
  </div>
</template>

<style></style>
