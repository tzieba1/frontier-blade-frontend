<template>
  <div>
    <h1>TimeSheet Details for {{ timeSheet.employeeName }}</h1>

    <button @click="toggleEditMode">
      {{ isEditing ? "Cancel" : "Edit" }}
    </button>

    <div v-if="!isEditing">
      <p>Date Range: {{ timeSheet.dateRange }}</p>
      <p>Hours Worked: {{ timeSheet.hoursWorked }}</p>
    </div>

    <div v-else>
      <label>
        Date Range:
        <input v-model="editedTimeSheet.dateRange" type="text" />
      </label>
      <label>
        Hours Worked:
        <input v-model="editedTimeSheet.hoursWorked" type="number" />
      </label>
      <button @click="saveChanges">Save</button>
    </div>

    <router-link to="/timesheets">Back to TimeSheets</router-link>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const route = useRoute();

// Fetch the timesheet details based on the route param 'id' using namespaced getter
const timeSheet = computed(() => {
  const timeSheetId = Number(route.params.id);
  return store.getters['timeSheets/timeSheetById'](timeSheetId);
});

const isEditing = ref(false);
const editedTimeSheet = ref({ ...timeSheet.value });

const toggleEditMode = () => {
  isEditing.value = !isEditing.value;
  if (isEditing.value) {
    editedTimeSheet.value = { ...timeSheet.value };
  }
};

const saveChanges = () => {
  // Dispatch an action to update the timesheet in the Vuex store
  store.dispatch('timeSheets/updateTimeSheet', editedTimeSheet.value);
  isEditing.value = false;
};

// Watch for changes in timeSheet to keep editedTimeSheet in sync
watch(timeSheet, (newVal) => {
  if (!isEditing.value) {
    editedTimeSheet.value = { ...newVal };
  }
});
</script>

<style scoped>
/* Add styles for edit mode and non-edit mode */
</style>
