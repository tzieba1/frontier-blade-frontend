<template>
  <div v-if="showModal" class="modal-overlay" @click="closeModal()">
    <div class="modal-content" @click.stop>
      <h2>Filtering Options</h2>

      <!-- Filters Section -->
      <div class="filter-section">
        <div class="filter-group">
          <label for="employeeFilter">Employee Name:</label>
          <input v-model="localFilters.employeeName" id="employeeFilter" placeholder="Filter by employee name" />
        </div>

        <div class="filter-group">
          <label for="approvalStatus">Approval Status:</label>
          <select v-model="localFilters.approvalStatus" id="approvalStatus">
            <option value="">Any</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="comments">Has Comments:</label>
          <select v-model="localFilters.hasComments" id="comments">
            <option value="">Any</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="startDate">Start Date:</label>
          <input type="date" v-model="localFilters.startDate" id="startDate" />
        </div>

        <div class="filter-group">
          <label for="endDate">End Date:</label>
          <input type="date" v-model="localFilters.endDate" id="endDate" />
        </div>

        <div class="button-container">
          <a href="#" @click.prevent="resetFilters()">Reset Filters</a>
          <button class="filter-button" @click="applyFilters()">Filter ᗊ</button>
        </div>
      </div>

      <hr />

      <!-- Sorting Section -->
      <h2>Sorting Options</h2>
      <div class="sort-section">
        <div class="sort-group">
          <label for="sortField">Sort by:</label>
          <select v-model="localSortOptions.field" id="sortField">
            <option value="employee.user.username">Employee Name</option>
            <option value="weekOf">Week Of</option>
            <option value="totals.billable.rate1ST">Billable Hours</option>
            <option value="totals.nonBillable.rate2ST">Non-Billable Hours</option>
          </select>
        </div>

        <div class="sort-group">
          <label for="sortDirection">Direction:</label>
          <select v-model="localSortOptions.direction" id="sortDirection">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div class="button-container">
          <a href="#" @click.prevent="resetSorting()">Reset Sorting</a>
          <button class="sort-button" @click="applySorting()">Sort ↓</button>
        </div>
      </div>

      <hr />
      <button class="cancel-button" @click="closeModal()">Cancel ✕</button>
    </div>
  </div>
</template>



<script setup lang="ts">
import { Filters, SortOptions } from '@/components/types';
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  showModal: boolean;
  filters: Filters;
  sortOptions: SortOptions;
}>();

const emit = defineEmits(['applyFilters',  'close']);

const localFilters = ref({ ...props.filters });
const localSortOptions = ref({ ...props.sortOptions });

// Sync local state with props when they change
watch(
  () => props.filters,
  (newFilters) => (localFilters.value = { ...newFilters })
);
watch(
  () => props.sortOptions,
  (newSortOptions) => (localSortOptions.value = { ...newSortOptions })
);

const resetFilters = () => {
  localFilters.value = {
    employeeName: '',
    startDate: null,
    endDate: null,
    approvalStatus: '',
    hasComments: '',
  };
};

const resetSorting = () => {
  localSortOptions.value = {
    field: 'employee.user.username',
    direction: 'asc',
  };
};

const applyFilters = () => {
  emit('applyFilters', {
    filters: localFilters.value,
  });
};

const applySorting = () => {
  emit('applyFilters', {
    sortOptions: localSortOptions.value,
  });
};

const closeModal = () => {
  emit('close');
  console.log("Emitting close event");
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #e1e1e1;
  color: #3573b7;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.filter-section, .sort-section {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.filter-group, .sort-group {
  flex: 1 1 calc(50% - 10px);
  display: flex;
  flex-direction: column;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  align-items: center;
}
label {
  text-align: left;
}
hr {
  border: 0;
  border-top: 1px solid #333;
  margin: 20px 0;
}
h2 {
  margin: 0;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.filter-button,
.sort-button, 
.cancel-button {
  font-size: 1rem;
  padding: 8px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 16px;
}

hr {
  margin: 0;
}
</style>
