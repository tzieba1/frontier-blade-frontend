<template>
  <div>
    <h1>TimeSheet Index</h1>
    <!-- <div>
      <label for="filter">Filter by Employee:</label>
      <input v-model="filter" id="filter" placeholder="Filter timesheets by employee name" />
    </div> -->
    <button @click="showFilterModal = true">Filter & Sort</button>
    <TimeSheetFilterSortModal
      :showModal="showFilterModal"
      :filters="filters"
      :sortOptions="sortOptions"
      @applyFilters="handleApplyFilters"
      @close="showFilterModal = false"
    />

    <table>
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Week Of</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="timeSheet in filteredAndSortedTimeSheets" :key="timeSheet.id">
          <td>{{ timeSheet.employee.user.username }}</td>
          <td>{{ timeSheet.weekOf.toLocaleDateString() }}</td>
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
import { Filters, SortOptions } from '@/components/types';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import TimeSheetFilterSortModal from '@/components/TimeSheetFilterSortModal.vue';

// Vuex store for managing TimeSheets
const store = useStore();
// const filter = ref('');

// // Use namespaced getters and actions from timeSheetsModule
// const filteredTimeSheets = computed(() => {
//   const filterText = filter.value.toLowerCase();
//   return store.getters['timeSheets/timeSheets'].filter((timeSheet: any) =>
//     timeSheet.employee.user.username.toLowerCase().includes(filterText)
//   );
// });
const showFilterModal = ref(false);
const filters = ref<Filters>({
    employeeName: '',
    startDate: null,
    endDate: null,
    approvalStatus: '',
    hasComments: '',
});
const sortOptions = ref<SortOptions>({
  field: 'employee.user.username',
  direction: 'asc',
});

const filteredAndSortedTimeSheets = computed(() => {
  let timeSheets = store.getters['timeSheets/timeSheets'];

  // Filter by employee name
  if (filters.value.employeeName) {
    const name = filters.value.employeeName.toLowerCase();
    timeSheets = timeSheets.filter((ts: any) =>
      ts.employee.user.username.toLowerCase().includes(name)
    );
  }

  // Filter by approval status
  if (filters.value.approvalStatus) {
    timeSheets = timeSheets.filter((ts: any) =>
      ts.approvals.some((approval: any) => approval.isApproved === (filters.value.approvalStatus === 'approved'))
    );
  }

  // Filter by comments presence
  if (filters.value.hasComments === 'true') {
    timeSheets = timeSheets.filter((ts: any) => ts.comments && ts.comments.trim() !== '');
  } else if (filters.value.hasComments === 'false') {
    timeSheets = timeSheets.filter((ts: any) => !ts.comments || ts.comments.trim() === '');
  }

  // Filter by date range
  if (filters.value.startDate) {
    timeSheets = timeSheets.filter((ts: any) =>
      new Date(ts.weekOf) >= new Date(filters.value.startDate!)
    );
  }
  if (filters.value.endDate) {
    timeSheets = timeSheets.filter((ts: any) =>
      new Date(ts.weekOf) <= new Date(filters.value.endDate!)
    );
  }

  // Apply sorting
  const { field, direction } = sortOptions.value;
  return timeSheets.sort((a: any, b: any) => {
    const valueA = field.split('.').reduce((obj, key) => obj?.[key], a);
    const valueB = field.split('.').reduce((obj, key) => obj?.[key], b);

    const order = direction === 'asc' ? 1 : -1;
    if (valueA < valueB) return -order;
    if (valueA > valueB) return order;
    return 0;
  });
});



const handleApplyFilters = ({ filters: newFilters, sortOptions: newSortOptions }: {filters: Filters, sortOptions:  SortOptions}) => {
  filters.value = newFilters;
  sortOptions.value = newSortOptions;
  showFilterModal.value = false;
};

const exportData = () => {
  store.dispatch('timeSheets/exportTimeSheetsToExcel', filteredAndSortedTimeSheets.value);
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
