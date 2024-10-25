<template>
  <div>
    <h1>Admin/Accountant Dashboard</h1>
    <p>Welcome to the dashboard. This page is accessible only to admins and accountants.</p>

    <!-- Placeholder for future features -->
    <div>
      <!-- Conditionally display TeamManagement for admins -->
      <TeamManagement />

      <h2>Manage Timesheets</h2>
      <p>This section will allow admins/accountants to view, filter, and export TimeSheets.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import TeamManagement from '@/components/TeamManagement.vue';
</script>

<style scoped>
h1 {
  margin-bottom: 16px;
}

h2 {
  margin-top: 24px;
}
</style>
