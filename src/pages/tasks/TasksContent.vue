<template>
  <div class="tasks">
    <div class="tasks__wrapper">
      <div class="tasks__top">
        <h3 v-if="user">Logged in as: {{ user.username }}</h3>
        <button @click="logOut">Logout</button>
      </div>
      <p-data-table v-model:editing-rows="editingRows" class="tasks__table" :value="tasks" edit-mode="row"
                    show-gridlines
                    @row-edit-init="rowEditInit"
                    @row-edit-save="rowEditSave">
        <template #empty>
          <h5 style="text-align: center; padding: 20px; ">Table is empty</h5>
        </template>
        <template #header>
          <p-btn class="tasks__create" label="Создать" @click="toggleModal"/>
        </template>
        <p-column field="title" header="Название">
          <template #body="{data, field}">
            {{ data[field] }}
          </template>
          <template #editor="{data, field}">
            <p-input v-model="data[field]" fluid/>
          </template>
        </p-column>
        <p-column field="description" header="Описание">
          <template #body="{data, field}">
            {{ data[field] }}
          </template>
          <template #editor="{data, field}">
            <p-input v-model="data[field]" fluid/>
          </template>
        </p-column>
        <p-column field="dueDate" header="Срок">
          <template #body="{data, field}">
            {{ data[field] }}
          </template>
          <template #editor="{data, field}">
            <p-datepicker
                v-model="data[field]"
                placeholder="Выберите дату выполнения"
                :min-date="new Date()"
                date-format="dd/mm/yy"
                :show-time="false"
                append-to="body"
            />
          </template>
        </p-column>
        <p-column field="category" header="Категория">
          <template #body="{data, field}">
            {{ data[field]['category'] }}
          </template>
          <template #editor="{data, field}">
            <p-dropdown
                v-model="data[field]"
                :options="categories"
                option-label="category"
                option-value="id"
                placeholder="Выберите категорию"
            />
          </template>
        </p-column>
        <p-column field="status" header="Статус выполнения">
          <template #body="{data, field}">
            {{ data[field] }}
          </template>
          <template #editor="{data, field}">
            <p-dropdown
                v-model="data[field]"
                :options="statuses"
                option-label="label"
                option-value="value"
                placeholder="Выберите статус"
            />
          </template>
        </p-column>
        <p-column field="priority" header="Приоритет">
          <template #body="{data, field}">
            {{ data[field] }}
          </template>
          <template #editor="{data, field}">
            <p-input-number
                v-model="data[field]"
                :min="1"
                :max="5"
                placeholder="Приоритет (1-5)"
            />
          </template>
        </p-column>
        <p-column field="photoPath" header="Фото">
          <template #body="{data, field}">
            <img :src="data[field]" alt="photo"/>
          </template>
        </p-column>
        <p-column header="Редактирование" row-editor/>
        <p-column field="id">
          <template #body="{ data, field }">
            <p-btn
                v-if="data[field] !== 0"
                :id="data[field]"
                label="Удалить"
                @click="confirmDelete(data[field])"
            />
          </template>
        </p-column>
        <template #footer>
          <p-paginator :rows="10" :total-records="totalElements" @page="onPageChange"/>
        </template>
      </p-data-table>
      <TaskContentModal
          :modalVisible="modalVisible"
          :select="select"
          :categories="categories"
          @update:modalVisible="modalVisible = $event"
          @add-task="handleAddTask"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import router from "@/router";
import PDataTable from "primevue/datatable";
import PColumn from "primevue/column";
import PBtn from "primevue/button";
import TaskContentModal from "@/pages/tasks/TaskContentModal.vue";
import {TaskApp} from "@/composables";
import PInput from 'primevue/inputtext'
import PDropdown from "primevue/dropdown";
import PDatepicker from 'primevue/calendar';
import PInputNumber from 'primevue/inputnumber';
import PPaginator, {type PageState} from "primevue/paginator";

const {
  logout,
  getUser,
  confirmDelete,
  getCategories,
  currentPage,
  getTasks,
  rowEditInit,
  totalElements,
  rowEditSave,
  editingRows,
  tasks,
  select,
  categories,
  modalVisible,
  addTask,
  toggleModal
} = TaskApp();

const user = ref(getUser());
const statuses = [
  {label: 'In Progress', value: 'IN_PROGRESS'},
  {label: 'Completed', value: 'COMPLETED'},
  {label: 'Canceled', value: 'CANCELED'},
];
const logOut = async () => {
  logout();
  router.push("/login");
};

const handleAddTask = (task, selectedFile) => {
  addTask(task, selectedFile);
};

const onPageChange = (page: PageState) => {
  console.log(page)
  console.log(totalElements.value)
  currentPage.value = page.page
  getTasks(currentPage.value)
}

onMounted(() => {
  getTasks(0)
  getCategories()
})
</script>
<style scoped>
.tasks__table {
  max-width: 70%;
  margin: 0 auto;
  backdrop-filter: blur(20px);
}

.tasks__table:deep(.p-datatable-header) {
  border: none;
}

.tasks__create {
  cursor: pointer;
  background: #027272;
  padding: 5px 20px;
  color: white;
  border-radius: 30px;
  margin-bottom: 20px;
}

.tasks__create:hover {
  color: white !important;
  background: #089494 !important;
  transition: all .3s;
}

.tasks__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
}

.tasks {
  padding: 20px;
}

.tasks__top button {
  padding: 10px 30px;
  border: none;
  background: #027272;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border-radius: 20px;
}
</style>