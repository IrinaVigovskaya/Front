<template>
  <header>
    <nav>
      <div v-if="isAuthenticated && user">
        Добро пожаловать, {{ user.name }}
        <button @click="logout">Выйти</button>
      </div>
      <div v-else>
        <form @submit.prevent="login">
          <div>
            <label for="username">Имя пользователя:</label>
            <input v-model="username" type="text" id="username" required />
          </div>
          <div>
            <label for="password">Пароль:</label>
            <input v-model="password" type="password" id="password" required />
          </div>
          <button type="submit">Войти</button>
          <p v-if="autError" class="error">{{ autError }}</p>
        </form>
      </div>
    </nav>
  </header>
</template>

<script>
import { useAuthStore} from "./stores/authStore.js";

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
  },
  methods: {
    logout() {
      this.authStore.logout();
    },
    login() {
      this.authStore.login({username: this.username, password: this.password});
    },
  },
  mounted() {
    const token = localStorage.getItem("token");
    if (token) {
      this.authStore.isAuthenticated = true;
      this.authStore.getUser();
    }
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>