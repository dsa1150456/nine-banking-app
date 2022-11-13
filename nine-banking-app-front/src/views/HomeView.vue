<script setup>
import { checkData } from "../service/profile";
const isLogin = checkData();
</script>

<template>
  <div
    class="container w-screen h-[80vh] bg-no-repeat bg-cover bg-center flex flex-wrap items-center justify-center gap-2"
  >
    <div v-if="isLogin" class="text-xl">
      หน้าโฮมแบบเอาสู่ระบบแล้วกดไป
      <a class="text-sky-500 underline" href="/account">บัญชี</a> ได้เลย
    </div>
    <div v-else class="text-xl">
      สวัสดีครับอยากฝาก ถอน โอนไวต้องไป
      <a class="text-sky-500 underline" href="/login">เข้าสู่ระบบ</a> ก่อนนะ
    </div>
  </div>
</template>

<style></style>
