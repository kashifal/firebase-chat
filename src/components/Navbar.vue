<script setup>
import { useAuth } from "@/firebase.js";
import { ref } from "vue";

const { user, isLogin, signIn, logOut } = useAuth();
const visible = ref(false);

const toggle = () => {
  visible.value = !visible.value;
};
</script>

<template>
  <nav class="flex items-center justify-between gap-2 bg-emerald-400 h-16 px-4">
    <span class="font-bold text-white text-xl truncate sm:text-3xl">Probspace - Team Chat</span>

    <button @click="logOut" class="btn btn-danger sm:px-4 px-3 py-1.5 truncate sm:py-2 text-right rounded-lg">
      Sign Out
    </button>
  </nav>
</template>

<style scoped></style>
