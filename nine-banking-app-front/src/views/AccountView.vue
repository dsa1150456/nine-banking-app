<script setup>
import { ref, onBeforeMount } from "vue";
import Transaction from "../components/Transaction.vue";
import Account from "../components/Account.vue";
import axios from "axios";
import config from "@/config";
import { getProfileData } from "../service/profile";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
import { useRouter } from "vue-router";
const appRouter = useRouter();

const profile = getProfileData();
const transactions = ref([]);
const accounts = ref([]);
const selectedAccount = ref(null);
const getAccountDataSelected = async (accountid) => {
  await axios
    .get(`${config.apiUrl}/accounts/` + accountid)
    .then((response) => {
      selectedAccount.value = response.data;
      console.log(selectedAccount.value);
      console.log(response);
    })
    .then(await getTransactionData(accountid))
    .catch((error) => {
      console.log(error);
    });
};
const getAccountData = async () => {
  await axios
    .get(`${config.apiUrl}/accounts/byuser/` + profile.value.userid)
    .then((response) => {
      accounts.value = response.data;
      if (!selectedAccount.value) {
        selectedAccount.value = response.data[0];
        getTransactionData(selectedAccount.value.accountid);
      }
      console.log(response);
    })
    .then()
    .catch((error) => {
      console.log(error);
    });
};

const getTransactionData = async (accountid) => {
  await axios
    .get(`${config.apiUrl}/transactions/byaccount/` + accountid)
    .then((response) => {
      transactions.value = response.data;
      console.log(transactions.value);
    })
    .catch((error) => {
      console.log(error);
    });
};

const createAccount = async () => {
  Swal.fire({
    title: "คุณต้องการจะเปิดบัญชีใหม่หรือไหม?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "ใช่",
    cancelButtonText: "ไม่ใช่",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await axios
        .post(`${config.apiUrl}/accounts`, {
          userid: profile.value.userid,
        })
        .then((response) => {
          console.log(response);
          Swal.fire({
            title: "สร้างบัญชี!",
            icon: "success",
            confirmButtonText: "สำเร็จ",
          }).then((result) => {
            if (result.isConfirmed) {
              appRouter.go();
            }
          });
        })
        .catch((error) => {
          Swal.fire("สร้างบัญชีไม่สำเร็จ", "error");
          console.log(error);
        });
    }
  });
};
onBeforeMount(async () => {
  await getAccountData();
});
</script>

<template>
  <div
    class="container w-screen h-[80vh] bg-no-repeat bg-cover bg-center flex flex-wrap items-center justify-center gap-2"
  >
    <div class="bg-white rounded-3xl h-5/6 w-7/12 flex shadow-lg">
      <Transaction
        :transactions="transactions"
        :selectedAccount="selectedAccount"
      />
    </div>
    <div class="bg-white rounded-3xl h-5/6 w-4/12 flex shadow-lg px-2.5">
      <Account
        :accounts="accounts"
        :selectedAccount="selectedAccount"
        @getAccountDataSelected="getAccountDataSelected($event)"
        @createAccount="createAccount()"
      />
    </div>
  </div>
</template>

<style></style>
