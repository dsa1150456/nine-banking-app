<script setup>
import { ref } from "vue";
const depositBalance = async () => {
  await axios
    .post(`${config.apiUrl}/users`, {
      username: username.value,
      password: password.value,
    })
    .then(function (response) {
      Swal.fire({
        title: "สมัครสมาชิกเสร็จเรียบร้อย!",
        text: "กดปุ่มเพื่อไปหน้าเข้าสู่ระบบ!",
        icon: "success",
        confirmButtonText: "เข้าสู่ระบบ",
      }).then(goLogin),
        console.log(response);
    })
    .catch(function (error) {
      Swal.fire("เกิดข้อผิดพลาด", "ชื่อผู้ใช้อาจจะมีคนใช้ไปแล้ว", "error");
      console.log(error);
    });

};
</script>

<template>
  <div class="flex flex-col p-10 min-w-full">
    <div class="flex flex-col justify-center items-center mb-2">
      เลขบัญชี : 1
    </div>
    <div
      class="aspect-square border rounded-full flex flex-col justify-center items-center mb-2"
    >
      <div class="text-sm">ยอดเงินคงเหลือ</div>
      <div class="text-lg">4000</div>
    </div>
    <div class="scroll flex flex-col justify-center items-center gap-3">
      <button
        class="w-full bg-green-300 hover:bg-green-400 text-gray-700 font-bold py-2 px-4 rounded inline-flex flex-col items-center"
      >
        <span class="material-symbols-outlined"> download </span>
        <span>ฝากเงิน</span>
      </button>
      <button
        class="w-full bg-red-300 hover:bg-red-400 text-gray-700 font-bold py-2 px-4 rounded inline-flex flex-col items-center"
      >
        <span class="material-symbols-outlined"> payments </span>
        <span>ถอนเงิน</span>
      </button>
      <button
        class="w-full bg-sky-300 hover:bg-sky-400 text-gray-700 font-bold py-2 px-4 rounded inline-flex flex-col items-center"
      >
        <span class="material-symbols-outlined"> compare_arrows </span>
        <span>โอนเงิน</span>
      </button>
    </div>
  </div>
</template>

<style></style>
