<template>
  <div>
    <h1>TimeSheet Details for {{ timeSheet.employeeName }}</h1>
    <p>Date Range: {{ timeSheet.dateRange }}</p>
    <p>Hours Worked: {{ timeSheet.hoursWorked }}</p>

    <router-link to="/timesheets">Back to TimeSheets</router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const route = useRoute();

// Fetch the timesheet details based on the route param 'id' using namespaced getter
const timeSheet = computed(() => {
  console.log(route.params.id);
  const timeSheetId = Number(route.params.id); // Must convert to number
  console.log(store.getters['timeSheets/timeSheetById'](timeSheetId));
  return store.getters['timeSheets/timeSheetById'](timeSheetId);
});
</script>

<style scoped>
/* Add styles for details page */
</style>
