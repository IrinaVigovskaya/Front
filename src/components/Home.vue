<template>
  <div v-if="isAuthenticated && user">
  <h1 class="text-2xl font-bold mb-4">Это программа для составления списка задач</h1>
  </div>
</template>


<script>
import { useAuthStore } from "../stores/authStore.js";

export default {
  data() {
    return {
      username: '',
      password: '',
      authStore: useAuthStore(),
    };
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated;
    },
    user() {
      return this.authStore.user;
    },
    autError() {
      return this.authStore.errorMessage;
    },
    tasks(){
      return this.authStore.tasks;
    }
  },
};
</script>