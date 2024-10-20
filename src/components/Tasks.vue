<template>
  <header>
    <nav>
      <div v-if="isAuthenticated && user">
        <h2 class="text-2xl font-bold mb-4">Список задач</h2>
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table class="w-full bg-blue-500 text-sm text-left text-white dark:text-gray-400">
            <thead class="text-xs uppercase bg-blue-700 dark:bg-gray-700">
            <tr>
              <th scope="col" class="px-6 py-3">
                id
              </th>
              <th scope="col" class="px-6 py-3">
                Название
              </th>
              <th scope="col" class="px-6 py-3">
                Описание
              </th>
              <th scope="col" class="px-6 py-3">
                Срок выполнения
              </th>
              <th scope="col" class="px-6 py-3">
                Пользователь
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="task in tasks" :key="task.id" class="bg-blue-400 border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4">{{ task.id }}</td>
              <td class="px-6 py-4">{{ task.task_name }}</td>
              <td class="px-6 py-4">{{ task.task_description }}</td>
              <td class="px-6 py-4">{{ task.task_due_date }}</td>
              <td class="px-6 py-4">{{ task.user_id }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </nav>
  </header>
</template>



<script>
import { useAuthStore } from "../stores/authStore.js";
import { useTaskStore } from '../stores/taskStore.js';
import { onMounted, computed } from 'vue';

export default {

  setup() {
    const authStore = useAuthStore();
    const taskStore = useTaskStore();


    onMounted(() => {
      // Получаем данные о пользователе
      authStore.getUser();

      // Получаем задачи после загрузки пользователя
      taskStore.fetchTasks(authStore);
    });

    return {
      tasks: taskStore.tasks,
      username: '',
      password: '',
      authStore,
      isAuthenticated: computed(() => authStore.isAuthenticated),
      user: computed(() => authStore.user),
    };
  },
};
</script>