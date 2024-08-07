<script setup>
import { computed, nextTick, onMounted, ref, watch } from "vue";
import Navbar from "@/components/Navbar.vue";
import { useChat } from "@/firebase.js";
import Message from "@/pages/chat/Message.vue";

const { messages, sendMessage } = useChat();

const messageList = computed(() => {
  return messages.value.slice().sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
});

const message = ref("");
const input = ref(null);
const bottom = ref(null);

onMounted(() => {
  input.value.focus();
});

function send() {
  sendMessage(message.value);
  message.value = "";
  nextTick(() => {
    input.value.focus();
    scrollToBottom();
  });
}

function scrollToBottom() {
  nextTick(() => {
    bottom.value.scrollIntoView({ behavior: "smooth" });
  });
}

watch(
  messages,
  () => {
    scrollToBottom();
  },
  { deep: true }
);
</script>

<template>
  <div>
    <Navbar />
    <div
      class="bg-green-400 h-[50rem] md:mx-40 mx-5 mt-5 md:px-5 py-5 px-3 rounded-lg"
    >
      <div
        class="rounded rounded-b-none h-full flex-1 items-start justify-start md:px-2"
      >
        <div
          class="relative bg-repeat bg-[url('assets/bg.jpg')] bg-opacity-25 rounded h-full flex flex-col flex-grow"
        >
          <div class="md:p-5 p-2 space-y-5 overflow-auto scrollbar h-full">
            <Message
              v-for="(message, index) in messageList"
              :key="index"
              :message="message"
            />
            <div ref="bottom"></div>
          </div>
          <div class="sticky bottom-0 left-0 w-full px-2 py-3 bg-blue-200">
            <div class="flex items-center justify-between">
              <input
                ref="input"
                v-model="message"
                class="input-text rounded rounded-r-none"
                @keyup.enter="send"
              />
              <button @click="send" class="btn bg-emerald-700 rounded-l-none">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-transparent w-full h-10 flex items-center justify-center mt-5"
    >
      <span class="text-gray-500">
        Owner
        <a
          href="https://kashifsulehria.com/"
          target="_blank"
          class="text-blue-500 font-bold"
        >
          Kashif Sulehria
        </a>
      </span>
    </div>
  </div>
</template>

<style scoped></style>
