<template>
  <div>
    <h1>TimeSheet Details for {{ timeSheet.employeeName }}</h1>

    <button @click="toggleEditMode">
      {{ isEditing ? "Cancel" : "Edit" }}
    </button>

    <div v-if="!isEditing">
      <p>Date Range: {{ timeSheet.dateRange }}</p>
      <p>Hours Worked: {{ timeSheet.hoursWorked }}</p>
      
      <h2>Entries</h2>
      <div v-for="entry in timeSheet.entries" :key="entry.id">
        <p>Date: {{ entry.date }}</p>
        <p>Work Order: {{ entry.workOrder }}</p>
        <p>Customer Name: {{ entry.customerName }}</p>
        <p>Billable Rate 1ST: {{ entry.billable.rate1ST }}</p>
        <p>Non-Billable Rate 2ST: {{ entry.nonBillable.rate2ST }}</p>
        <p>Per Diem: {{ entry.additionalQualifiers.perDiem }}</p>
        <p>Day/Night: {{ entry.additionalQualifiers.dayOrNight }}</p>
      </div>
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

      <h2>Edit Entries</h2>
      <div v-for="(entry, index) in editedTimeSheet.entries" :key="entry.id">
        <label>
          Date:
          <input v-model="entry.date" type="date" />
        </label>
        <label>
          Work Order:
          <input v-model="entry.workOrder" type="text" />
        </label>
        <label>
          Customer Name:
          <input v-model="entry.customerName" type="text" />
        </label>
        <label>
          Billable Rate 1ST:
          <input v-model="entry.billable.rate1ST" type="number" />
        </label>
        <label>
          Non-Billable Rate 2ST:
          <input v-model="entry.nonBillable.rate2ST" type="number" />
        </label>
        <label>
          Per Diem:
          <input v-model="entry.additionalQualifiers.perDiem" type="number" />
        </label>
        <label>
          Day/Night:
          <input v-model="entry.additionalQualifiers.dayOrNight" type="number" />
        </label>
      </div>

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
