<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const showPassword = ref(false);
const appRouter = useRouter();
const goSignUp = () => appRouter.push({ name: "sign-up" });
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
          <form class="mb-4 space-y-4" @submit.prevent="signInUser()">
            <label class="block">
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-indigo-800"
                type="email"
                v-model="email"
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
                  autocomplete="false"
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
            <p v-if="hasErrors" class="text-sm text-red-500 font-normal">
              *Incorrect email address or password.
            </p>
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
