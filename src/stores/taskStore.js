import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './authStore.js';


export const useTaskStore = defineStore('tasks', {
    state: () => ({
        tasks: [],
        errorMessage: '',
    }),
    actions: {
        async fetchTasks() {
            const authStore = useAuthStore(); // Получаем доступ к хранилищу auth
            this.errorMessage = '';
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/task', {
                    headers: {
                        Authorization: 'Bearer ' + authStore.token, // Используем authStore.token
                    },
                });
                this.tasks = response.data;
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                    console.error(error);
                } else if (error.request) {
                    this.errorMessage = error.message;
                    console.error(error);
                } else {
                    console.error(error);
                }
            }
        },

        async createTask(taskData, authStore) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/new', taskData, {
                    headers: {
                        Authorization: 'Bearer ' + authStore.token,
                    },
                });
                this.tasks.push(response.data); // Добавляем новую задачу в список
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                    console.error(error);
                } else if (error.request) {
                    this.errorMessage = error.message;
                    console.error(error);
                } else {
                    console.error(error);
                }
            }
        },

    },
});