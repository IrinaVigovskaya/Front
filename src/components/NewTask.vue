<template>
  <div>
      <h2 class="text-2xl font-bold mb-4">Добавить новую задачу</h2>
      <form v-on:submit.prevent="createTask" class="space-y-4">
        <div class="flex flex-col">
          <InputText type="text" placeholder="Название задачи" v-model="this.taskName"/>
        </div>
        <div class="flex flex-col">
          <InputText type="text" placeholder="Описание задачи" v-model="this.taskDescription"/>
        </div>
        <div class="mb-4 mt-4">
          <label for="task_due_date" id="task_due_date" class="block text-sm font-medium text-gray-700">
            Срок выполнения:
          </label>
          <input type="date" v-model="this.taskDate" required
          class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
          <div class="mb-4 mt-4">
            <label for="file" id="file-label" ref="fileLabel" class="block text-md font-medium text-gray-500 border border-gray-300 rounded-md p-2">
              <span class="pi pi-upload mx-3"></span>Выбрать изображение
            </label>
            <input type="file" hidden id="file" name="file" v-on:change="changeCaption" required accept="image/*">
          </div>
        <button type="submit" class="inline-flex items-center px-4 py-3 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Добавить задачу
        </button>
      </form>
    </div>
  <Toast position="bottom-right"/>
</template>

<script>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Toast from "primevue/toast";
import { useTaskStore } from '../stores/taskStore.js';

export default {
  name: "CreateTask",
  components: {InputText, Toast},
  setup() {
    const fileLabel = ref(null);
    return { fileLabel };
  },
  data() {
    return {
      dataStore: useTaskStore(),
      taskName: '',
      taskDescription: '',
      taskDate: null,
      taskImage: null,
    }
  },
  computed: {
    errorMessage() {
      return this.dataStore.errorMessage;
    },
    errorCode() {
      return this.dataStore.errorCode;
    }
  },
  methods: {
    changeCaption(event) {
      const file = event.target.files[0];
      if (file) {
        this.fileLabel.innerHTML = '<span class="pi pi-file mx-3"></span>${file.name}';
        this.taskImage = file;
      } else {
        this.fileLabel.innerHTML = '<span class="pi pi-upload mx-3"></span>Выбрать изображение';
        this.taskImage = null;
      }
    },
    async createTask() {
      const formData = new FormData();
      formData.append('task_name', this.taskName);
      formData.append('task_description', this.taskDescription);
      formData.append('task_due_date', this.taskDate);
      formData.append('image', this.taskImage);

      await this.dataStore.create_task(formData);
      if (this.errorCode > 0)
        this.$toast.add({
          severity: 'error',
          summary: "Ошибка добавления данных",
          detail: this.errorMessage,
          life: 4000
        });
      else
        this.$toast.add({
          severity: 'success',
          sumary: 'Данные успешно добавлены',
          detail: this.errorMessage,
          life: 4000
        });
      this.taskName = '';
      this.taskDescription = '';
      this.taskDate = null;
      this.taskImage = null;
      this.$refs.fileLabel.innerHTML = '<span class="pi pi-upload mx-3"></span>Выбрать изображение';
    }
  }
}
</script>