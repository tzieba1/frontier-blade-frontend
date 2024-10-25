<template>
  <div>
    <h1>TimeSheet Details</h1>
    <h2>{{ timeSheet.employee.user.firstName }} {{ timeSheet.employee.user.lastName }} (Employee #{{
      timeSheet.employee.number }})
      <span>

        <!-- Button to add a new entry -->
        <button class="add-button" @click="addEntry">Add Entry</button>

        <!-- Edit button to toggle edit mode -->
        <button class="edit-button" @click="toggleEditMode">
          {{ isEditing ? "Save" : "Edit" }}
        </button>
      </span>
    </h2>

    <hr />

    <!-- Non-entry fields displayed above the table -->
    <div class="timesheet-details">
      <p><strong>Week Of:</strong> {{ timeSheet.weekOf.toLocaleDateString() }}</p>
      <p><strong>Comments:</strong> {{ timeSheet.comments }}</p>
      <p><strong>Approval Status:</strong> {{ approvalStatus }}</p>
    </div>

    <!-- Transposed Table Structure for TimeSheet Entries with Totals Column -->
    <table class="timesheet-table">
      <thead>
        <tr>
          <th>Field</th>
          <th v-for="(entry, index) in editedTimeSheet.entries" :key="entry.id">Entry {{ index + 1 }}</th>
          <th>Totals</th>
          <th>Validation</th>
        </tr>
      </thead>
      <tbody>
        <!-- Date Row -->
        <TimeSheetRow fieldLabel="Date" :fieldKey="'date'" :entries="editedTimeSheet.entries" :isEditing="isEditing"
          :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'date', payload.updatedEntry)" />

        <!-- Work Order Row -->
        <TimeSheetRow fieldLabel="Work Order" :fieldKey="'workOrder'" :entries="editedTimeSheet.entries"
          :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'workOrder', payload.updatedEntry)" />

        <!-- Customer Name Row -->
        <TimeSheetRow fieldLabel="Customer Name" :fieldKey="'customerName'" :entries="editedTimeSheet.entries"
          :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'customerName', payload.updatedEntry)" />

        <!-- Shop Comments Row -->
        <TimeSheetRow fieldLabel="Shop Comments" :fieldKey="'shopComments'" :entries="editedTimeSheet.entries"
          :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'shopComments', payload.updatedEntry)" />

        <!-- Non-Billable Rate 2 ST Row -->
        <TimeSheetRow fieldLabel="Non-Billable Rate 2ST" :fieldKey="'nonBillable.rate2ST'"
          :entries="editedTimeSheet.entries" :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'nonBillable.rate2ST', payload.updatedEntry)" />

        <!-- Non-Billable Rate 2 OT Row -->
        <TimeSheetRow fieldLabel="Non-Billable Rate 2OT" :fieldKey="'nonBillable.rate2OT'"
          :entries="editedTimeSheet.entries" :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'nonBillable.rate2OT', payload.updatedEntry)" />

        <!-- Non-Billable Comments Row -->
        <TimeSheetRow fieldLabel="Non-Billable Comments" :fieldKey="'nonBillable.comments'"
          :entries="editedTimeSheet.entries" :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'nonBillable.comments', payload.updatedEntry)" />

        <!-- Billable Rate 1 ST Row -->
        <TimeSheetRow fieldLabel="Billable Rate 1ST" :fieldKey="'billable.rate1ST'" :entries="editedTimeSheet.entries"
          :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'billable.rate1ST', payload.updatedEntry)" />

        <!-- Billable Rate 1 OT Row -->
        <TimeSheetRow fieldLabel="Billable Rate 1OT" :fieldKey="'billable.rate1OT'" :entries="editedTimeSheet.entries"
          :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'billable.rate1OT', payload.updatedEntry)" />

        <!-- Billable Rate 2 ST Row -->
        <TimeSheetRow fieldLabel="Billable Rate 2ST" :fieldKey="'billable.rate2ST'" :entries="editedTimeSheet.entries"
          :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'billable.rate2ST', payload.updatedEntry)" />

        <!-- Billable Rate 2 OT Row -->
        <TimeSheetRow fieldLabel="Billable Rate 2OT" :fieldKey="'billable.rate2OT'" :entries="editedTimeSheet.entries"
          :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'billable.rate2OT', payload.updatedEntry)" />

        <!-- Billable Vacation Row -->
        <TimeSheetRow fieldLabel="Billable Vacation" :fieldKey="'billable.vacation'" :entries="editedTimeSheet.entries"
          :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'billable.vacation', payload.updatedEntry)" />

        <!-- Billable Sick Row -->
        <TimeSheetRow fieldLabel="Billable Sick" :fieldKey="'billable.sick'" :entries="editedTimeSheet.entries"
          :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'billable.sick', payload.updatedEntry)" />

        <!-- Billable Holiday Row -->
        <TimeSheetRow fieldLabel="Billable Holiday" :fieldKey="'billable.holiday'" :entries="editedTimeSheet.entries"
          :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'billable.holiday', payload.updatedEntry)" />

        <!-- Additional Qualifiers Per Diem Row -->
        <TimeSheetRow fieldLabel="Per Diem" :fieldKey="'additionalQualifiers.perDiem'"
          :entries="editedTimeSheet.entries" :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'additionalQualifiers.perDiem', payload.updatedEntry)" />

        <!-- Additional Qualifiers Day or Night Row -->
        <TimeSheetRow fieldLabel="Day or Night" :fieldKey="'additionalQualifiers.dayOrNight'"
          :entries="editedTimeSheet.entries" :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'additionalQualifiers.dayOrNight', payload.updatedEntry)" />
      </tbody>
    </table>

    <router-link to="/timesheets" v-slot="{ href, navigate, isActive, isExactActive }">
      <a :href="href" @click="navigate" :class="{ active: isActive, exactActive: isExactActive }"
        class="back-link">
        Back to TimeSheets
      </a>
    </router-link>
  </div>
  <TextEntryModal v-if="isModalVisible" :initialText="modalText" :isVisible="isModalVisible" @update:text="updateField"
    @close="closeModal" />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import TextEntryModal from '@/components/TextEntryModal.vue';
import TimeSheetRow from '@/components/TimeSheetRow.vue';
import { Approval } from '@/store/types';

const store = useStore();
const route = useRoute();

// Fetch the timesheet details based on the route param 'id' using namespaced getter
const timeSheet = computed(() => {
  const timeSheetId = Number(route.params.id);
  return store.getters['timeSheets/timeSheetById'](timeSheetId);
});

const validationErrors = ref<Record<string, string>>({});
const isEditing = ref(false);
const editedTimeSheet = ref({ ...timeSheet.value });

// Modal State
const isModalVisible = ref(false);
const modalText = ref('');
const modalField = ref('');
const modalIndex = ref(0);

// Validation function
const validateEntries = () => {
  validationErrors.value = {}; // Reset errors

  editedTimeSheet.value.entries.forEach((entry: any, index: number) => {
    if (!entry.workOrder) {
      validationErrors.value[`workOrder_${index}`] = 'Work Order is required';
    }
    if (!entry.customerName) {
      validationErrors.value[`customerName_${index}`] = 'Customer Name is required';
    }
    if (entry.nonBillable.rate2ST < 0) {
      validationErrors.value[`nonBillable_rate2ST_${index}`] = 'Must be non-negative';
    }
    if (entry.billable.vacation < 0) {
      validationErrors.value[`billable_vacation_${index}`] = 'Must be non-negative';
    }
    // Add more conditions as needed
  });

  return Object.keys(validationErrors.value).length === 0; // Return true if no errors
};

const updateEntry = (index: number, fieldKey: string, updatedEntry: any) => {
  const newEntry = { ...editedTimeSheet.value.entries[index] };
  setNestedFieldValue(newEntry, fieldKey, getNestedFieldValue(updatedEntry, fieldKey));
  editedTimeSheet.value.entries[index] = newEntry;
};

// Helper to set a nested field value by string key path
function setNestedFieldValue(obj: any, fieldKey: string, value: any) {
  const keys = fieldKey.split('.');
  const lastKey = keys.pop();
  let nested = obj;
  keys.forEach((key) => (nested = nested[key]));
  if (lastKey) nested[lastKey] = value;
}

// Helper to get nested field values
function getNestedFieldValue(entry: any, fieldKey: string): any {
  return fieldKey.split('.').reduce((obj, key) => obj?.[key], entry);
}

const toggleEditMode = () => {
  isEditing.value = !isEditing.value;
  if (isEditing.value) {
    editedTimeSheet.value = { ...timeSheet.value };
  } else {
    saveChanges();
  }
};

const updateField = (newText: string) => {
  editedTimeSheet.value.entries[modalIndex.value][modalField.value] = newText;
};

const closeModal = () => {
  isModalVisible.value = false;
};

// Save function with validation
const saveChanges = () => {
  if (validateEntries()) {
    // Save logic here
    isEditing.value = false;
  } else {
    console.log('Validation failed:', validationErrors.value);
  }
};

const addEntry = () => {
  const newEntry = {
    id: editedTimeSheet.value.entries.length + 1,
    timeSheetId: timeSheet.value.id,
    date: new Date(),
    workOrder: '',
    customerName: '',
    shopComments: '',
    suggestedSalesPart: '',
    nonBillable: { rate2ST: 0, rate2OT: 0, comments: '' },
    billable: { rate1ST: 0, rate1OT: 0, rate2ST: 0, rate2OT: 0, vacation: 0, sick: 0, holiday: 0 },
    additionalQualifiers: { perDiem: 0, dayOrNight: 1 }
  };
  editedTimeSheet.value.entries.push(newEntry);
};

const approvalStatus = computed(() => {
  const approvals = timeSheet.value.approvals;

  if (approvals.length === 0) {
    return "Pending";
  }

  const latestApproval = approvals.slice().sort((a: Approval, b: Approval) => new Date(b.approvalDate).getTime() - new Date(a.approvalDate).getTime())[0];

  return latestApproval.isApproved ? "Approved" : "Denied";
});

// Watch for changes in timeSheet to keep editedTimeSheet in sync
watch(timeSheet, (newVal) => {
  if (!isEditing.value) {
    editedTimeSheet.value = { ...newVal };
  }
});
</script>

<style scoped>
h1 {
  background-color: #3573b7;
  border-radius: 16px;
  padding: 14px;
  margin: 16px 0;
}

h2 {
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timesheet-table {
  margin: auto;
  width: 100%;
  border-spacing: 0;
  border-color: #c1c1c1;
  border-radius: 8px;
  /* Adjust the radius as needed */
  overflow: hidden;
  /* Ensures that corners are clipped */
}

.timesheet-table th {
  text-align: left;
  padding: 8px;
  border: 1px solid #333;
  border-top-color: #3573b7;
  border-bottom-color: #3573b7;
  background-color: #3573b7;
}

.timesheet-table th:first-child {
  border-left-color: #3573b7;
  border-top-left-radius: 8px;
}

.timesheet-table th:last-child {
  border-right-color: #3573b7;
  border-top-right-radius: 8px;
}

.edit-button,
.add-button {
  font-size: 1rem;
  padding: 8px;
  margin: 8px;
}

.back-link {
  display: inline-block;
  margin-top: 16px;
}

</style>
