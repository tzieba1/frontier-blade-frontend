<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <h3>{{ title }}</h3>
      <ul class="error-list">
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
      <div class="button-container">
        <button @click="closeModal">Dismiss</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Validation Errors'
  },
  errors: {
    type: Array as () => string[],
    required: true
  },
  isVisible: {
    type: Boolean,
    required: true
  }
});

const emits = defineEmits(['close']);

const closeModal = () => {
  emits('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #c1c1c1;
  color: #333;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
}
h3 {
  margin: 0;
  text-align: left;
  font-size: 1.25em;
  font-weight: bold;
}
.error-list {
  margin: 15px 0;
  padding: 0;
  list-style-type: none;
  color: #bf0e0e;
}
.error-list li {
  margin: 5px 0;
}
.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
.button-container button {
  background: #3573b7;
  border: 1px solid transparent;
  padding: 8px 16px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  border-radius: 4px;
}

.button-container button:hover {
  background: #333;
}
</style>
