<script setup lang="ts">
import NavBar from './components/NavBar.vue';
</script>

<template>
  <div>
    <NavBar />
    <!-- Route Content -->
    <router-view />
  </div>
</template>

<style scoped>
/* Add any global styles if needed */
</style>
