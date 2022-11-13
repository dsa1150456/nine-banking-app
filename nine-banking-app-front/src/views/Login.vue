<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import config from "@/config";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";

const showPassword = ref(false);
const appRouter = useRouter();
const goSignUp = () => appRouter.push({ name: "sign-up" });
const loginUser = async () => {
  await axios
    .post(`${config.apiUrl}/users/login`, {
      username: username.value,
      password: password.value,
    })
    .then((response) => {
      localStorage.setItem("profile", JSON.stringify(response.data));
      Swal.fire({
        title: "เข้าสู่ระบบสำเร็จ!",
        text: "กดปุ่มเพื่อไปหน้าบัญชี!",
        icon: "success",
        confirmButtonText: "ไปต่อ",
      }).then((result) => {
        if (result.isConfirmed) {
          appRouter.go();
        }
      });
    })
    .catch((error) => {
      Swal.fire("ข้อมูลไม่ถูกต้อง", "ชื่อผู้ใช้หรือรหัสผ่านผิดพลาด", "error");
      console.log(error);
    });
};
const username = ref("");
const password = ref("");
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
              ลงชื่อเข้าใช้งาน
            </h1>
          </div>
          <form class="mb-4 space-y-4" @submit.prevent="loginUser()">
            <label class="block">
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-indigo-800"
                type="text"
                v-model="username"
                maxlength="20"
                placeholder="ชื่อผู้ใช้"
                inputmode="email"
                required
              />
            </label>
            <label class="block">
              <div class="relative mb-3">
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-800"
                  :type="showPassword == true ? 'text' : 'password'"
                  v-model="password"
                  maxlength="14"
                  minlength="8"
                  autocomplete="off"
                  placeholder="รหัสผ่าน"
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
            </label>
            <button
              type="submit"
              class="w-full py-3 mt-1 text-white bg-[#7474fc] hover:bg-[#2929a8] focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm"
            >
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
        <p class="mb-4 text-xl text-center text-gray-400">
          <span
            @click="goSignUp()"
            class="text-gray-700 underline hover:text-[#7474fc] cursor-pointer"
            >ยังไม่มีรหัส?</span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<style></style>
