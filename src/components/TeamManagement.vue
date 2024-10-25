<template>
  <div v-if="isAuthenticated && role === 'admin'">
    <h2>Manage Teams</h2>
    <p>This section will allow admins to create teams and manage employees.</p>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Computed values to check authentication and role
const role = computed(() => store.getters['auth/role']);
const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);

watch(
  [isAuthenticated, role],
  ([newAuth, newRole]) => {
    console.log('Auth status changed:', newAuth);
    console.log('Role changed:', newRole);
  },
  { immediate: true }
);
</script>

<style scoped>
/* Add styles specific to this component */
</style>
