<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <div class="button-container">
        <button @click="confirmAction">Confirm</button>
        <button @click="closeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Confirm'
  },
  description: {
    type: String,
    required: true
  },
  isVisible: {
    type: Boolean,
    required: true
  }
});

const emits = defineEmits(['confirm', 'close']);

const confirmAction = () => {
  emits('confirm');
  emits('close');
};

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
p {
  margin: 15px 0;
  text-align: left;
}
.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
.button-container button {
  margin-left: 8px;
  background: #3573b7;
  border: 1px solid transparent;
}

.button-container button:hover {
  background: #333
}
</style>
