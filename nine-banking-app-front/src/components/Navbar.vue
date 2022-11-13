<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { checkData, getProfileData } from "../service/profile";
const isLogin = checkData();
const profile = getProfileData();
const router = useRouter();
const logoutFunc = () => {
  localStorage.removeItem("profile");
  router.go("");
};
</script>

<template>
  <nav>
    <div class="relative z-20 border-b bg-white">
      <div class="px-6 md:px-12 lg:container lg:mx-auto lg:px-6 lg:py-4">
        <div class="flex items-center justify-between">
          <div class="relative z-20">
            <router-link :to="{ name: 'home' }">
              <img
                src="../assets/images/logo.png"
                alt="logo-nine"
                class="w-32"
              />
            </router-link>
          </div>
          <div class="flex items-center justify-end border-l lg:border-l-0">
            <input
              type="checkbox"
              name="hamburger"
              id="hamburger"
              class="peer"
              hidden
            />
            <label
              for="hamburger"
              class="peer-checked:hamburger block relative z-20 p-6 -mr-6 cursor-pointer lg:hidden"
            >
              <div
                aria-hidden="true"
                class="m-auto h-0.5 w-6 rounded bg-sky-900 transition duration-300"
              ></div>
              <div
                aria-hidden="true"
                class="m-auto mt-2 h-0.5 w-6 rounded bg-sky-900 transition duration-300"
              ></div>
            </label>
            <div
              class="peer-checked:translate-x-0 fixed inset-0 w-[calc(100%-4.5rem)] translate-x-[-100%] bg-white border-r shadow-xl transition duration-300 lg:border-r-0 lg:w-auto lg:static lg:shadow-none lg:translate-x-0"
            >
              <div
                class="flex flex-col h-full justify-between lg:items-center lg:flex-row"
              >
                <ul
                  class="px-6 pt-32 text-gray-700 space-y-8 md:px-12 lg:space-y-0 lg:flex lg:space-x-12 lg:pt-0"
                >
                  <li>
                    <router-link
                      :to="{ name: 'home' }"
                      class="duration-300 relative hover:text-[#7474fc]"
                    >
                      หน้าแรก
                    </router-link>
                  </li>
                  <li v-if="isLogin">
                    <router-link
                      :to="{ name: 'account' }"
                      class="duration-300 relative hover:text-[#7474fc]"
                    >
                      บัญชี
                    </router-link>
                  </li>
                </ul>
                <div
                  v-if="isLogin"
                  class="border-t py-8 px-6 md:px-12 md:py-16 lg:border-t-0 lg:border-l lg:py-0 lg:pr-0 lg:pl-6"
                >
                  <div
                    @click="logoutFunc()"
                    class="block hover:cursor-pointer px-6 py-3 hover:bg-[#a82929] rounded-full bg-[#fc7474] text-center text-white"
                  >
                    ออกระบบ
                  </div>
                </div>
                <div
                  v-else
                  class="login border-t py-8 px-6 md:px-12 md:py-16 lg:border-t-0 lg:border-l lg:py-0 lg:pr-0 lg:pl-6"
                >
                  <router-link
                    :to="{ name: 'login' }"
                    class="block px-6 py-3 hover:bg-[#2929a8] rounded-full bg-[#7474fc] text-center text-white"
                  >
                    เข้าสู่ระบบ
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style>
li .router-link-active.router-link-active.router-link-active {
  @apply text-[#7474fc] underline;
}

.login .router-link-active.router-link-active.router-link-active {
  @apply bg-[#2929a8];
}
</style>
