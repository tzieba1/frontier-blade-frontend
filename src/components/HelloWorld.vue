<script setup lang="ts">
import { ref, computed, defineEmits } from 'vue';

// Define props
defineProps<{ msg: string }>();

// Define emits for emitting events
const emit = defineEmits(['countIncremented']);

// Reactive state
const count = ref(0);

// Method to emit an event when the count changes
const increment = () => {
  count.value++;
  emit('countIncremented', count.value);
};

// Computed property that returns double the count
const doubleCount = computed(() => count.value * 2);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="increment">count is {{ count }}</button>
    <p>Double count is {{ doubleCount }}</p>
  </div>

  <p>Edit <code>components/HelloWorld.vue</code> to test HMR</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
