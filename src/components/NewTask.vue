<template>
  <div>
  <div>
    <h2>Добавить  новую  задачу</h2>
    <form @submit.prevent="createTask">
      <div class="form-group">
        <label for="task_name">Название  задачи:</label>
        <input
            type="text"
            class="form-control"
            id="task_name"
            v-model="newTask.task_name"
            required
        />
      </div>
      <div class="form-group">
        <label for="task_description">Описание:</label>
        <textarea
            class="form-control"
            id="task_description"
            v-model="newTask.task_description"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="task_due_date">Срок  выполнения:</label>
        <input
            type="date"
            class="form-control"
            id="task_due_date"
            v-model="newTask.task_due_date"
            required
        />
      </div>
      <button type="submit" class="btn btn-primary">Добавить  задачу</button>
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

    };
  },
};
</script>