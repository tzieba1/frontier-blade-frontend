<script setup lang="ts">
import NavBar from './components/NavBar.vue';
</script>

<template>
    <NavBar />
    <div class="route-content">
      <router-view />
    </div>
</template>

<style scoped>
  .route-content {
    width: 100%;
  }
</style>
