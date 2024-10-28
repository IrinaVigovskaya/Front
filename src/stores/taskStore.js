import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './authStore.js';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useTaskStore = defineStore('tasks', {
    state: () => ({
        tasks: [],
        errorMessage: '',
        currentPage: 1, // Текущая страница
        totalRecords: 0, // Общее количество записей
        loading: false, // Индикатор загрузки
    }),
    actions: {
        async fetchTasks(page = 1, perPage) {
            this.loading = true;
            this.errorMessage = '';
            const authStore = useAuthStore();
            try {
                const response = await axios.get(backendUrl + '/task', {
                    headers: {
                        Authorization: 'Bearer ' + authStore.token,
                    },
                    params: { // Добавляем параметры для пагинации
                        page: page,
                        per_page: perPage,
                    },
                });
                this.tasks = response.data.data; // Предполагаем, что API возвращает массив данных в свойстве 'data'
                this.totalRecords = response.data.total; // Предполагаем, что API возвращает общее количество записей в свойстве 'total'
                this.currentPage = page;
            } catch (error) {
                // Обработка ошибок
            } finally {
                this.loading = false;
            }
        },
    },
});
