<template>
  <header>
    <nav>
      <div v-if="isAuthenticated && user">
        <h2>Список задач</h2>
        <table class="table table-dark table-striped">
          <thead>
          <tr>
            <th>id</th>
            <th>Название</th>
            <th>Описание</th>
            <th>Срок выполнения</th>
            <th>Пользователь</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="task in tasks" :key="task.id">

            <td>{{ task.id }}</td>
            <td>{{ task.task_name }}</td>
            <td>{{ task.task_description }}</td>
            <td>{{ task.task_due_date }}</td>
            <td>{{ task.user_id }}</td>
          </tr>
          </tbody>
        </table>
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