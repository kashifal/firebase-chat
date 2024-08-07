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
  <nav
    class="flex items-center justify-between gap-2 h-16 pt-4 bg-transparent px-4"
  >
    <div>
      <span class="font-bold text-4xl">Probspace - Team Chat</span>
    </div>
    <button @click="logOut" class="btn btn-danger btn-sm text-right rounded-lg">
      Sign Out
    </button>
  </nav>
</template>

<style scoped></style>
