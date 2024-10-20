<template>
  <Menubar :model="items">
    <template #start>
      <span>
        <img src="@/assets/logo.svg" width="70" alt="My SVG Icon"/>
      </span>
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
      <a class="flex items-center ml-6 p-4">
        <router-link v-if="item.route" :to="item.route">
          <span :class="item.icon"/>
          <span class="ml-1">{{ item.label }}</span>
        </router-link>
      </a>
    </template>
    <template #end>
      <div class="flex items-center gap-2">
      <div v-if="isAuthenticated && user">
        <span class="pi pi-fw pi-user mr-4"/> {{user.username}}
        <button @click="logout" class="ml-2 inline-flex items-center px-4 py-3 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Выйти</button>
      </div>
      <div v-else>

        <form @submit.prevent="login">

          <InputText v-model="username" type="text" id="username" required placeholder="Имя пользователя" class="m-2 sm:w-auto"
                     :class="{'p-invalid': autError}"/>
          <InputText v-model="password" type="password" id="password" required placeholder="Пароль" class="m-2 sm:w-auto"
                     :class="{'p-invalid': autError}"/>

          <button type="submit" class="inline-flex items-center px-4 py-3 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Войти</button>
          <div class="ml-2"><small v-if="autError" class="error">{{ autError}}</small></div>

        </form>
      </div>
      </div>
    </template>
  </Menubar>
  <router-view></router-view>
</template>

<script>
import { useAuthStore } from "./stores/authStore.js";
import Button from "primevue/button";
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";

export default {
  components: {Button, Menubar, InputText},
  data() {
    return {
      username: '',
      password: '',
      authStore: useAuthStore(),
      items: [
        {
          label: 'Главная страница',
          icon: 'pi pi-fw pi-home',
          route: '/',
          shortcut: 'Ctrl+H',
          submenu: [

          ],
        },
        {
          label: 'Задачи',
          icon: 'pi pi-fw pi-folder',
          route: '/tasks',
        },
        {
          label: "Добавить задачу",
          icon: 'pi pi-fw pi-box',
          route: '/add',
        },
      ],
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