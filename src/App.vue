<template>
  <header>
    <nav>
      <div v-if="isAuthenticated && user">
        Добро пожаловать, {{ user.username }}
        <button @click="logout">Выйти</button>
        <ul>
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/tasks">Задачи</router-link></li>
          <li><router-link to="/add">Добавить задачу</router-link></li>
        </ul>
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
  <router-view></router-view>
</template>

<script>
import { useAuthStore } from "./stores/authStore.js";

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
    login() {
      this.authStore.login({username: this.username, password: this.password});

    },
    logout() {
      this.authStore.logout();

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