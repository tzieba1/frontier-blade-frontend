<template>
    <div class="card">
      <!-- Optional header slot for custom title or additional elements -->
      <div class="card-title" v-if="$slots.header">
        <slot name="header"></slot>
      </div>
      
      <!-- Main content area for flexible layout -->
      <div class="card-content">
        <slot></slot> <!-- Default slot for any content -->
      </div>
      
      <!-- Optional footer slot for additional actions or info -->
      <div class="card-footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  color: #3573b7;
  width: 100%;
  border-radius: 8px;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.card-title {
  background-color: #3573b7;
  color: #fff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  text-align: left;
  font-weight: 700;
  font-size: 1.2rem;
  padding: 8px;
}

.card-content {
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.card-footer {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  padding: 8px;
  border-top: 1px solid #e2e2e2;
}
</style>
