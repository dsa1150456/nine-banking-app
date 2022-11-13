<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import config from "@/config";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
const createUser = async () => {
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
const checkPasswordMatch = ref(true);
const validatePassword = () => {
  if (confirmPassword.value != password.value) {
    checkPasswordMatch.value = false;
  } else checkPasswordMatch.value = true;
};
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const errors = ref(false);
const invalidateForm = () => {
  errors.value = true;
};
const appRouter = useRouter();
const goLogin = () => appRouter.push({ name: "login" });
</script>

<template>
  <div class="container mr-auto ml-auto pr-auto pl-auto">
    <div
      class="columns sm:flex-col md:flex md:flex-row justify-center items-center text-center min-h-[80vh]"
    >
      <div class="md:w-3/5">
        <img src="../assets/images/logo.png" />
      </div>
      <div class="md:w-2/5">
        <div class="">
          <div>
            <h1 class="mb-4 text-2xl font-semibold text-gray-900">
              สมัครสมาชิก
            </h1>
          </div>
          <form
            class="mb-4 space-y-4"
            @submit.prevent="createUser()"
            :class="errors ? 'errors' : false"
          >
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-800"
              type="text"
              v-model="username"
              maxlength="20"
              placeholder="ชื่อผู้ใช้"
              @invalid="invalidateForm()"
              required
            />
            <div class="relative mb-3">
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-800"
                :type="showPassword == true ? 'text' : 'password'"
                v-model="password"
                maxlength="14"
                minlength="8"
                autocomplete="off"
                placeholder="รหัสผ่าน"
                v-on:input="validatePassword()"
                @invalid="invalidateForm()"
                required
              />
              <div
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                <span
                  class="material-symbols-outlined text-gray-400"
                  @click="showPassword = !showPassword"
                  style="cursor: pointer"
                  >{{
                    showPassword == false ? "visibility" : "visibility_off"
                  }}</span
                >
              </div>
            </div>
            <div class="relative mb-3">
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-800"
                id="confirm-password"
                :type="showPassword == true ? 'text' : 'password'"
                placeholder="ยืนยันรหัสผ่าน"
                maxlength="14"
                minlength="8"
                v-model="confirmPassword"
                v-on:input="validatePassword()"
                @invalid="invalidateForm()"
                autocomplete="off"
                required
              />

              <div class="flex flex-wrap">
                <div v-if="!checkPasswordMatch" class="text-red-500">
                  *รหัสผ่านไม่ตรงกัน
                </div>
              </div>
            </div>
            <button
              type="submit"
              :class="{
                'bg-[#7474fc] hover:bg-[#7474fc] cursor-not-allowed	':
                  !checkPasswordMatch,
              }"
              :disabled="!checkPasswordMatch"
              class="w-full py-3 mt-1 text-white bg-[#7474fc] hover:bg-[#2929a8] focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm"
            >
              สมัครสมาชิก
            </button>
          </form>
        </div>
        <p class="mb-4 text-xl text-center text-gray-400">
          <span
            @click="goLogin()"
            class="text-gray-700 underline hover:text-[#7474fc] cursor-pointer"
            >มีรหัสอยู่แล้วต้องการไปเข้าสู่ระบบ?</span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-message {
  display: none;
  color: red;
}
form.errors :invalid {
  @apply border-red-500;
}
</style>
