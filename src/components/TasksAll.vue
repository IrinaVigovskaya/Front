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
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useTaskStore } from '../stores/taskStore.js';

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