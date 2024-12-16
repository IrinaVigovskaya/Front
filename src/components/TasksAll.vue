<template>
  <DataTable
      ref="dataTable"
      :value="dataStore.tasks"
      :lazy="true"
      :loading="dataStore.loading"
      :paginator="true"
      :rows="perPage"
      :rowsPerPageOptions="[2, 5, 10]"
      :totalRecords="dataStore.totalRecords"
      @page="onPageChange"
      v-model:rowsPerPage="perPage"
      responsive-layout="scroll"
  >
    <Column field="id" header="№" />
    <Column field="task_name" header="Название" />
    <Column field="task_description" header="Описание" />
    <Column field="task_due_date" header="Дедлайн" />
    <Column field="picture_url" header="Изображение">
      <template #body="{data}">
        <img v-if="data.picture_url" :src="data.picture_url" class="fixed-size-image"/>
        <span v-else>Нет изображения</span>
      </template>
    </Column>
    
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useTaskStore } from '../stores/taskStore.js';
import Button from 'primevue/button';

export default {
  name: "TasksAll",
  components: {DataTable, Column},
  data() {
    return {
      dataStore: useTaskStore(),
      perPage: 5
    }
  },
  mounted() {
    this.dataStore.fetchTasks();
  },
  methods: {
    onPageChange(event) {
      console.log("onPageChange - page:", event.page);
      this.perPage = event.rows;
      this.dataStore.fetchTasks(event.page + 1, this.perPage); // Передаем perPage
    },
  }
};
</script>

<style scoped>
.fixed-size-image {
  width: 100px; /* Ширина изображения */
  height: 100px; /* Высота изображения */
  object-fit: cover; /*  Обрезка изображения, чтобы заполнить контейнер */
}
</style>