<script setup lang="ts">
import {defineProps, defineEmits, ref} from "vue";
import PInput from 'primevue/inputtext';
import PDatepicker from 'primevue/calendar';
import PDropdown from 'primevue/dropdown';
import PInputNumber from 'primevue/inputnumber';
import PBtn from 'primevue/button';

const props = defineProps({
  modalVisible: Boolean,
  select: Object,
  categories: Array,
});
const emits = defineEmits(['update:modalVisible', 'add-task']);

const statuses = [
  {label: 'In Progress', value: 'IN_PROGRESS'},
  {label: 'Completed', value: 'COMPLETED'},
  {label: 'Canceled', value: 'CANCELED'},
];

const close = () => {
  emits('update:modalVisible', false);
};

const selectedFile = ref(null)
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0];
    console.log(selectedFile.value)
  }
};

const createNewTask = () => {
  emits('add-task', props.select, selectedFile.value);
  close();
};
</script>

<template>
  <div v-if="modalVisible" class="modal-overlay" @click.self="close">
    <div class="modal">
      <div class="modal__wrapper">
        <p-input v-model="select.title" placeholder="Введите название"/>
        <p-input v-model="select.description" placeholder="Введите описание"/>
        <p-datepicker
            v-model="select.dueDate"
            placeholder="Выберите дату выполнения"
            :min-date="new Date()"
            date-format="dd/mm/yy"
            :show-time="false"
            append-to="body"
        />
        <p-dropdown
            v-model="select.categoryId"
            :options="categories"
            option-label="category"
            option-value="id"
            placeholder="Выберите категорию"
        />
        <p-dropdown
            v-model="select.status"
            :options="statuses"
            option-label="label"
            option-value="value"
            placeholder="Выберите статус"
        />
        <p-input-number
            v-model="select.priority"
            :min="1"
            :max="5"
            placeholder="Приоритет (1-5)"
        />
        <input type="file" @change="handleFileUpload"/>
        <div class="modal-overlay__bottom">
          <p-btn label="Закрыть" @click="close"/>
          <p-btn label="Создать" @click="createNewTask"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(100, 99, 99, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  backdrop-filter: blur(10px);
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal__wrapper {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
}

.modal__wrapper input {
  border: 1px solid grey;
  padding: 5px 10px;
  border-radius: 10px;
}

.modal-overlay:deep(.p-datepicker-input), .modal-overlay:deep(.p-select-label), .modal-overlay:deep(.p-inputtext) {
  border: 1px solid grey !important;
}

.modal-overlay__bottom {
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: center;
}
</style>
