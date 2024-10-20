<template>
  <div>
    <div v-if="isAuthenticated && user">
      <h2 class="text-2xl font-bold mb-4">Добавить новую задачу</h2>
      <form @submit.prevent="createTask" class="space-y-4">
        <div>
          <label for="task_name" class="block text-sm font-medium text-gray-700">
            Название задачи:
          </label>
          <input
              type="text"
              id="task_name"
              v-model="newTask.task_name"
              required
              class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="task_description" class="block text-sm font-medium text-gray-700">
            Описание:
          </label>
          <textarea
              id="task_description"
              v-model="newTask.task_description"
              class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>
        <div>
          <label for="task_due_date" class="block text-sm font-medium text-gray-700">
            Срок выполнения:
          </label>
          <input
              type="date"
              id="task_due_date"
              v-model="newTask.task_due_date"
              required
              class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button type="submit" class="inline-flex items-center px-4 py-3 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Добавить задачу
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useTaskStore } from '../stores/taskStore.js';
import { useAuthStore } from '../stores/authStore.js';
import { onMounted, computed } from 'vue';

export default {

  setup() {
    const taskStore = useTaskStore();
    const authStore = useAuthStore();


    const newTask = {
      task_name: '',
      task_description: '',
      task_due_date: '',
      user_id: computed(() => authStore.user.id) //  Используем  computed
    };

    const createTask = async () => {
      try {

        const userId = newTask.user_id.value;

        const taskData = {
          task_name: newTask.task_name,
          task_description: newTask.task_description,
          task_due_date: newTask.task_due_date,
          user_id: userId,
        };

        await taskStore.createTask(taskData, authStore);

        //  После  успешного  создания  очищаем  форму
        newTask.task_name = '';
        newTask.task_description = '';
        newTask.task_due_date = '';
      } catch (error) {
        console.error(error);
        //  Обработайте  ошибку,  например,  покажите  сообщение  пользователю
      }
    };

    onMounted(() => {
      //  Загружаем  данные  пользователя  в  onMounted
      authStore.getUser();
    });


    return {
      newTask,
      createTask,
      isAuthenticated: computed(() => authStore.isAuthenticated),
      user: computed(() => authStore.user)
    };
  },
};
</script>