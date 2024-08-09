<script setup>
import { computed, nextTick, onMounted, ref, watch } from "vue";
import Navbar from "@/components/Navbar.vue";
import { useChat } from "@/firebase.js";
import Message from "@/pages/chat/Message.vue";

const { messages, sendMessage } = useChat();

const messageList = computed(() => {
  return messages.value.slice().sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
});

const message = ref("");
const input = ref(null);
const bottom = ref(null);

onMounted(() => {
  input.value.focus();
  scrollToBottom();
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
  <div class="bg-emerald-100">
    <Navbar />
    <div
      class="h-screen md:mx-40 mx-5 mt-5 md:px-5 py-5 px-3 rounded-lg"
    >
      <div
        class="rounded rounded-b-none h-full flex-1 items-start justify-start md:px-2"
      >
        <div
          class="relative bg-repeat  bg-white rounded h-full flex flex-col flex-grow"
        >
          <div class="md:p-5 p-2 space-y-5 overflow-auto scrollbar h-full" 
         
          > 
            <Message
              v-for="(message, index) in messageList"
              :key="index"
              :message="message"
            />
            <div ref="bottom"></div>
          </div>
          <div class="sticky bottom-0 left-0 w-full px-2 py-3 ">
            <div class="flex items-center relative justify-between">
             <div class="absolute left-3 text-emerald-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <g id="User Circle">
                  <path id="icon" d="M6.05 17.6C6.05 15.3218 8.26619 13.475 11 13.475C13.7338 13.475 15.95 15.3218 15.95 17.6M13.475 8.525C13.475 9.89191 12.3669 11 11 11C9.6331 11 8.525 9.89191 8.525 8.525C8.525 7.1581 9.6331 6.05 11 6.05C12.3669 6.05 13.475 7.1581 13.475 8.525ZM19.25 11C19.25 15.5563 15.5563 19.25 11 19.25C6.44365 19.25 2.75 15.5563 2.75 11C2.75 6.44365 6.44365 2.75 11 2.75C15.5563 2.75 19.25 6.44365 19.25 11Z" stroke="currentColor" stroke-width="1.6" />
                </g>
              </svg>
             </div>
              <input
                ref="input"
                v-model="message"
                placeholder="Type here..."
                class="input grow shrink basis-0 text-black placeholder:text-xs font-medium leading-4 focus:outline-none w-full py-3 pr-5 pl-10  border-gray-300 border rounded-full"
                @keyup.enter="send"
              />
            
              <div class="absolute top-[5px] right-2">
                <div class="flex items-center gap-3">
                  <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <g id="Attach 01">
                      <g id="Vector">
                        <path d="M14.9332 7.79175L8.77551 14.323C8.23854 14.8925 7.36794 14.8926 6.83097 14.323C6.294 13.7535 6.294 12.83 6.83097 12.2605L12.9887 5.72925M12.3423 6.41676L13.6387 5.04176C14.7126 3.90267 16.4538 3.90267 17.5277 5.04176C18.6017 6.18085 18.6017 8.02767 17.5277 9.16676L16.2314 10.5418M16.8778 9.85425L10.72 16.3855C9.10912 18.0941 6.49732 18.0941 4.88641 16.3855C3.27549 14.6769 3.27549 11.9066 4.88641 10.198L11.0441 3.66675" stroke="#9CA3AF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M14.9332 7.79175L8.77551 14.323C8.23854 14.8925 7.36794 14.8926 6.83097 14.323C6.294 13.7535 6.294 12.83 6.83097 12.2605L12.9887 5.72925M12.3423 6.41676L13.6387 5.04176C14.7126 3.90267 16.4538 3.90267 17.5277 5.04176C18.6017 6.18085 18.6017 8.02767 17.5277 9.16676L16.2314 10.5418M16.8778 9.85425L10.72 16.3855C9.10912 18.0941 6.49732 18.0941 4.88641 16.3855C3.27549 14.6769 3.27549 11.9066 4.88641 10.198L11.0441 3.66675" stroke="black" stroke-opacity="0.2" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M14.9332 7.79175L8.77551 14.323C8.23854 14.8925 7.36794 14.8926 6.83097 14.323C6.294 13.7535 6.294 12.83 6.83097 12.2605L12.9887 5.72925M12.3423 6.41676L13.6387 5.04176C14.7126 3.90267 16.4538 3.90267 17.5277 5.04176C18.6017 6.18085 18.6017 8.02767 17.5277 9.16676L16.2314 10.5418M16.8778 9.85425L10.72 16.3855C9.10912 18.0941 6.49732 18.0941 4.88641 16.3855C3.27549 14.6769 3.27549 11.9066 4.88641 10.198L11.0441 3.66675" stroke="black" stroke-opacity="0.2" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                      </g>
                    </g>
                  </svg>
              <button @click="send" class=" px-4 font-semibold justify-center flex items-center gap-1 py-1.5 hover:bg-opacity-90 bg-emerald-500 rounded-full text-white h-fit ">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <g id="Send 01">
                    <path id="icon" d="M9.04071 6.959L6.54227 9.45744M6.89902 10.0724L7.03391 10.3054C8.31034 12.5102 8.94855 13.6125 9.80584 13.5252C10.6631 13.4379 11.0659 12.2295 11.8715 9.81261L13.0272 6.34566C13.7631 4.13794 14.1311 3.03408 13.5484 2.45139C12.9657 1.8687 11.8618 2.23666 9.65409 2.97257L6.18714 4.12822C3.77029 4.93383 2.56187 5.33664 2.47454 6.19392C2.38721 7.0512 3.48957 7.68941 5.69431 8.96584L5.92731 9.10074C6.23326 9.27786 6.38623 9.36643 6.50978 9.48998C6.63333 9.61352 6.72189 9.7665 6.89902 10.0724Z" stroke="white" stroke-width="1.6" stroke-linecap="round" />
                  </g>
                </svg>
                Send
              </button>
            </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-transparent w-full text-sm h-10 flex items-center justify-center mt-5"
    >
      <span class="text-gray-500">
        Owner
        <a
          href="https://kashifsulehria.com/"
          target="_blank"
          class="text-emerald-500 hover:underline font-bold"
        >
          Kashif Sulehria
        </a>
      </span>
    </div>
  </div>
</template>

<style scoped></style>
