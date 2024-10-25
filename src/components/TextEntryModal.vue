<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <textarea v-model="text" rows="10" cols="50"></textarea>
      <div class="button-container">
        <button @click="saveText">Save</button>
        <button @click="closeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  initialText: String,
  isVisible: Boolean
});

const emits = defineEmits(['update:text', 'close']);
const text = ref(props.initialText);

watch(() => props.initialText, (newText) => {
  text.value = newText;
});

const saveText = () => {
  emits('update:text', text.value);
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
  background: white;
  padding: 20px;
  border-radius: 8px;
}
.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
.button-container button {
  margin-left: 8px;
}
</style>
