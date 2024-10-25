<template>
  <div>
    <h1>TimeSheet Index</h1>
    <div>
      <label for="filter">Filter by Employee:</label>
      <input v-model="filter" id="filter" placeholder="Filter timesheets by employee name" />
    </div>

    <table>
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Date Range</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="timeSheet in filteredTimeSheets" :key="timeSheet.id">
          <td>{{ timeSheet.employeeName }}</td>
          <td>{{ timeSheet.dateRange }}</td>
          <td>
            <!-- Use :to to pass the id as a route param to TimeSheetDetails -->
            <router-link :to="{ name: 'TimeSheetDetails', params: { id: timeSheet.id } }" v-slot="{ href, navigate, isActive, isExactActive }">
              <a :href="href" @click="navigate" :class="{ active: isActive, exactActive: isExactActive }" class="fbs-style-link">
                View Details
              </a>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <button @click="exportData">Export to Excel</button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

// Vuex store for managing TimeSheets
const store = useStore();
const filter = ref('');

// Use namespaced getters and actions from timeSheetsModule
const filteredTimeSheets = computed(() => {
  const filterText = filter.value.toLowerCase();
  return store.getters['timeSheets/timeSheets'].filter((timeSheet: any) =>
    timeSheet.employeeName.toLowerCase().includes(filterText)
  );
});

const exportData = () => {
  store.dispatch('timeSheets/exportTimeSheetsToExcel', filteredTimeSheets.value);
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

thead {
  background-color: #f0f0f0;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #333;
  color: white;
}

tr:hover {
  background-color: #f1f1f1;
  color: #333
}

button {
  margin-top: 20px;
}
</style>
