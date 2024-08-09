<script setup>
import { onMounted, ref } from "vue";
import { LogoGithub, LogoGoogle, Skull } from "@vicons/ionicons5";
import { useAuth } from "@/firebase.js";

const { user, isLogin, login, loginWithGoogle, loginAnonymously } = useAuth();

const username = ref("");

// TODO: Add username for anonymous login (do this with localstorage)
</script>

<template>
  <div class="w-full h-full">
  <div class="grid  text-center gap-2">
    <button @click="loginWithGoogle" class="btn btn-google hover:bg-emerald-400 py-3 hover:text-white  has-icon btn-sm">
      <LogoGoogle class="h-4" />
      <span>Sign in with Google</span>
    </button>
    <!-- <button @click="login" class="btn btn-github has-icon btn-sm">
      <LogoGithub class="h-4" />
      <span>Sign in with GitHub</span>
    </button> -->
    <span>- or -</span>
    <button
      @click="loginAnonymously"
      class="btn py-4 btn-secondary has-icon btn-sm"
    >
      <Skull class="h-4" />
      <span class="truncate">Enter Chat & explore the world's for you</span>
    </button>
  </div>
</div>
</template>

<style scoped></style>
