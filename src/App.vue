<script setup>
import { useAuth } from "@/firebase.js";
import Login from "@/pages/Login.vue";
import Index from "@/pages/chat/Index.vue";

const { isLogin } = useAuth();
</script>

<template>
  <div class="grid h-screen place-items-center mx-3 md:mx-0" v-if="!isLogin">
    <n-card class="max-w-md bg-green-100">
      <template #header>
        <h1 class="text-xl font-bold text-center mb-2">
          Probspace - Team Chat
        </h1>
      </template>
      <Login />
      <div
        class="bg-transparent w-full h-10 flex items-center justify-center mt-5"
      >
        <span class="text-gray-500"
          >Owner
          <a href="https://kashifsulehria.com/" class="text-blue-500 font-bold"
            >Kashif Sulehria</a
          ></span
        >
      </div>
    </n-card>
  </div>
  <Index class="h-full" v-else />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
