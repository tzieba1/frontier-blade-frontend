<template>
  <div>
    <h1>All TimeSheets</h1>
    <button class="filterSortModal" @click="showFilterSortModal = true">Filter & Sort</button>
    <TimeSheetFilterSortModal
      :showModal="showFilterSortModal"
      :filters="filters"
      :sortOptions="sortOptions"
      @applyFilters="handleApplyFilters"
      @applySorting="handleApplySorting"
      @close="showFilterSortModal = false"
    />

    <button @click="exportData">Export to Excel</button>

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
          <td>{{ timeSheet.employee.user.email }}</td>
          <td>{{ new Date(timeSheet.entries[0].date).toISOString().split('T')[0]}}</td>
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
  </div>
</template>

<script setup lang="ts">
import { Filters, SortOptions } from '@/components/types';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import TimeSheetFilterSortModal from '@/components/TimeSheetFilterSortModal.vue';

// Vuex store for managing TimeSheets
const store = useStore();

// Local state for filters, sort options, and modal visibility
const showFilterSortModal = ref(false);
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

  const user = store.getters['auth/user'];
  const role = store.getters['auth/role'];

  // Return an empty array if no user is authenticated
  if (user === null || role === 'none') return [];

  // Filter timesheets based on user ID if an employee is logged in
  if (role == 'employee') {
    timeSheets = timeSheets.filter((ts: any) => ts.employee.user.id === user.id);
  }

  // Continue with other filters and sorting
  if (filters.value.employeeName) {
    const name = filters.value.employeeName.toLowerCase();
    timeSheets = timeSheets.filter((ts: any) =>
      ts.employee.user.username.toLowerCase().includes(name)
    );
  }

  if (filters.value.approvalStatus) {
    timeSheets = timeSheets.filter((ts: any) =>
      ts.approvals.some((approval: any) => approval.isApproved === (filters.value.approvalStatus === 'approved'))
    );
  }

  if (filters.value.hasComments === 'true') {
    timeSheets = timeSheets.filter((ts: any) => ts.comments && ts.comments.trim() !== '');
  } else if (filters.value.hasComments === 'false') {
    timeSheets = timeSheets.filter((ts: any) => !ts.comments || ts.comments.trim() === '');
  }

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
  console.log("Handling apply filters");
  filters.value = newFilters;
};

const handleApplySorting = ({ sortOptions: newSortOptions }: {sortOptions: SortOptions}) => {
  console.log("Handling apply sorting");
  sortOptions.value = newSortOptions;
};

const exportData = () => {
  store.dispatch('timeSheets/exportTimeSheetsToExcel', filteredAndSortedTimeSheets.value);
};
</script>

<style scoped>
h1 {
  background-color: #3573b7;
  border-radius: 16px;
  padding: 14px;
  margin: 16px 0;
}
button {
  float: right;
  margin-bottom: 16px;
  margin-top: 32px;
  margin-left: 16px;
}
</style>
