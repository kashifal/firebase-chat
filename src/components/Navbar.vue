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
  <nav class="flex items-center justify-between gap-2 bg-emerald-500 h-16 px-4">
    <span class="font-bold text-white text-3xl">Probspace - Team Chat</span>

    <button @click="logOut" class="btn btn-danger btn-sm text-right rounded-lg">
      Sign Out
    </button>
  </nav>
</template>

<style scoped></style>
