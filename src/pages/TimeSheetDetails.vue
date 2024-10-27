<template>
  <div>
    <h1>TimeSheet Details</h1>
    <h2>{{ timeSheet.employee.user.firstName }} {{ timeSheet.employee.user.lastName }} (Employee #{{
      timeSheet.employee.number }})
      <!-- Edit button to toggle edit mode, shown only if conditions are met -->
      <button v-if="showEditButton" class="edit-button" @click="toggleEditMode">
        {{ isEditing ? "Save 💾" : "Edit ✏️" }}
      </button>
    </h2>

    <hr />

    <!-- Non-entry fields displayed above the table -->
    <div class="timesheet-details">
      <p><strong>Week Of: </strong>
        <span v-if="isEditing && isAdmin">
          <input type="date" v-model="weekOfString" />
        </span>
        <span v-else>{{ weekOfString }}</span>
      </p>

      <p><strong>Comments: </strong>
        <span v-if="isEditing && isAdmin">
          <input type="text" v-model="editedTimeSheet.comments" placeholder="Add comments" />
        </span>
        <span v-else>{{ timeSheet.comments }}</span>
      </p>

      <p><strong>Approval Status: </strong>
        <span v-if="isEditing && isAdmin">
          <select v-model="approvalStatus">
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Denied">Denied</option>
          </select>
        </span>
        <span v-else>{{ approvalStatus }}</span>
      </p>
    </div>


    <!-- Transposed Table Structure for TimeSheet Entries with Totals Column -->
    <table class="timesheet-table">
      <thead>
        <tr>
          <th>Category</th>
          <th>Field</th>
          <th v-for="(entry, index) in editedTimeSheet.entries" :key="entry.id">
            <div class="table-heading-flex">
              <span>{{ getDayName(index) }}</span>
              <!-- Add button in the last entry column header -->
              <span v-if="index === editedTimeSheet.entries.length - 1 && isEditing" class="button-wrapper">
                <button class="add-button" @click="addEntry">
                  Add +
                </button>
              </span>
            </div>
          </th>
          <th>Totals</th>
          <th>Validation</th>
        </tr>
      </thead>
      <tbody>
        <!-- Date Row -->
        <TimeSheetRow fieldLabel="Date" :placeholder="'Date'" :disabled="true" :fieldKey="'date'"
          :entries="editedTimeSheet.entries" :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'date', payload.updatedEntry)" />

        <!-- Work Order Row -->
        <TimeSheetRow fieldLabel="Work Order" :placeholder="'Work Order'" :fieldKey="'workOrder'"
          :entries="editedTimeSheet.entries" :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'workOrder', payload.updatedEntry)" />

        <!-- Customer Name Row -->
        <TimeSheetRow fieldLabel="Customer Name" :placeholder="'Customer Name'" :fieldKey="'customerName'"
          :entries="editedTimeSheet.entries" :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'customerName', payload.updatedEntry)" />

        <!-- Shop Comments Row -->
        <TimeSheetRow fieldLabel="Shop Comments" :placeholder="'Shop Comments'" :fieldKey="'shopComments'"
          :entries="editedTimeSheet.entries" :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'shopComments', payload.updatedEntry)" />

        <!-- Suggested Sales Part -->
        <TimeSheetRow fieldLabel="Suggested Sales Part" :placeholder="'Suggested Sales Part'"
          :fieldKey="'suggestedSalesPart'" :entries="editedTimeSheet.entries" :isEditing="isEditing"
          :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'suggestedSalesPart', payload.updatedEntry)" />

        <!-- Non-Billable Rate 2 ST Row -->
        <TimeSheetRow fieldLabel="Rate 2 ST" :placeholder="'Non-Billable Rate 2 ST'" :fieldKey="'nonBillable.rate2ST'"
          :entries="editedTimeSheet.entries" :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'nonBillable.rate2ST', payload.updatedEntry)" />

        <!-- Non-Billable Rate 2 OT Row -->
        <TimeSheetRow fieldLabel="Rate 2 OT" :placeholder="'Non-Billable Rate 2 OT'" :fieldKey="'nonBillable.rate2OT'"
          :entries="editedTimeSheet.entries" :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'nonBillable.rate2OT', payload.updatedEntry)" />

        <!-- Non-Billable Comments Row -->
        <TimeSheetRow fieldLabel="Comments" :placeholder="'Non-Billable Comments'" :fieldKey="'nonBillable.comments'"
          :entries="editedTimeSheet.entries" :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'nonBillable.comments', payload.updatedEntry)" />

        <!-- Billable Rate 1 ST Row -->
        <TimeSheetRow fieldLabel="Rate 1 ST" :placeholder="'Billable Rate 1 ST'" :fieldKey="'billable.rate1ST'"
          :entries="editedTimeSheet.entries" :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'billable.rate1ST', payload.updatedEntry)" />

        <!-- Billable Rate 1 OT Row -->
        <TimeSheetRow fieldLabel="Rate 1 OT" :placeholder="'Billable Rate 1 OT'" :fieldKey="'billable.rate1OT'"
          :entries="editedTimeSheet.entries" :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'billable.rate1OT', payload.updatedEntry)" />

        <!-- Billable Rate 2 ST Row -->
        <TimeSheetRow fieldLabel="Rate 2 ST" :placeholder="'Billable Rate 2 ST'" :fieldKey="'billable.rate2ST'"
          :entries="editedTimeSheet.entries" :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'billable.rate2ST', payload.updatedEntry)" />

        <!-- Billable Rate 2 OT Row -->
        <TimeSheetRow fieldLabel="Rate 2 OT" :placeholder="'Billable Rate 2 OT'" :fieldKey="'billable.rate2OT'"
          :entries="editedTimeSheet.entries" :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'billable.rate2OT', payload.updatedEntry)" />

        <!-- Billable Vacation Row -->
        <TimeSheetRow fieldLabel="Vacation" :placeholder="'Billable Vacation'" :fieldKey="'billable.vacation'"
          :entries="editedTimeSheet.entries" :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'billable.vacation', payload.updatedEntry)" />

        <!-- Billable Sick Row -->
        <TimeSheetRow fieldLabel="Sick" :placeholder="'Billable Sick'" :fieldKey="'billable.sick'"
          :entries="editedTimeSheet.entries" :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'billable.sick', payload.updatedEntry)" />

        <!-- Billable Holiday Row -->
        <TimeSheetRow fieldLabel="Holiday" :placeholder="'Billable Holiday'" :fieldKey="'billable.holiday'"
          :entries="editedTimeSheet.entries" :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'billable.holiday', payload.updatedEntry)" />

        <!-- Additional Qualifiers Per Diem Row -->
        <TimeSheetRow fieldLabel="Per Diem" :placeholder="'AQ Per Diem'" :fieldKey="'additionalQualifiers.perDiem'"
          :entries="editedTimeSheet.entries" :isEditing="isEditing" :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'additionalQualifiers.perDiem', payload.updatedEntry)" />

        <!-- Additional Qualifiers Day or Night Row -->
        <TimeSheetRow fieldLabel="Day or Night" :placeholder="'AQ Day/Night'"
          :fieldKey="'additionalQualifiers.dayOrNight'" :entries="editedTimeSheet.entries" :isEditing="isEditing"
          :validationErrors="validationErrors"
          @update="(payload) => updateEntry(payload.index, 'additionalQualifiers.dayOrNight', payload.updatedEntry)" />
      </tbody>
    </table>

    <div class="footer-buttons-container">
      <router-link to="/timesheets" v-slot="{ href, navigate, isActive, isExactActive }">
        <a :href="href" @click="navigate" :class="{ active: isActive, exactActive: isExactActive }" class="back-link">
          Back to TimeSheets
        </a>
      </router-link>
      <button class="submit-button" @click="openConfirmModal" v-if="!isEditing">Submit ✉️</button>
    </div>
  </div>

  <TextEntryModal v-if="isModalVisible" :initialText="modalText" :isVisible="isModalVisible" @update:text="updateField"
    @close="closeModal" />

  <!-- Confirmation Modal -->
  <ConfirmationModal v-if="showConfirmModal" :isVisible="showConfirmModal"
    description="Are you sure you want to submit this timesheet?" @confirm="submitAction"
    @close="showConfirmModal = false" />

  <!-- Alert Modal -->
  <AlertModal v-if="showAlertModal" :isVisible="showAlertModal" :errors="validationErrorsList"
    @close="showAlertModal = false" />
</template>

<script setup lang="ts">
import { computed, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import TextEntryModal from '@/components/TextEntryModal.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import TimeSheetRow from '@/components/TimeSheetRow.vue';
import { DayOrNight } from '@/store/enums';
import AlertModal from '@/components/AlertModal.vue';

const showAlertModal = ref(false);  // Track alert modal visibility
const validationErrorsList: Ref<string[]> = ref([]);  // List of validation errors for modal

const store = useStore();
const route = useRoute();

// Fetch the timesheet details based on the route param 'id' using namespaced getter
const timeSheet = computed(() => {
  const timeSheetId = Number(route.params.id);
  return store.getters['timeSheets/timeSheetById'](timeSheetId);
});

// Fetch the user's role from the store
const isAdmin = computed(() => store.getters['auth/role'] === 'admin');

// Show the edit button based on user role and timesheet status
const showEditButton = computed(() => {
  if (isAdmin.value) {
    // Always show the edit button for admins
    return true;
  }
  // Non-admin conditions: timesheet must be in "Pending" state and not already in edit mode
  return approvalStatus.value === 'Pending';
});

const validationErrors = ref<Record<string, string>>({});
const isEditing = ref(false);
const editedTimeSheet = ref({ ...timeSheet.value });

// Modal State
const isModalVisible = ref(false);
const modalText = ref('');
const modalField = ref('');
const modalIndex = ref(0);
const showConfirmModal = ref(false);

// Add the logic for date calculations
const startOfWeek = ref(getStartOfWeek(timeSheet.value.weekOf || new Date()));
const weekOfString = computed({
  get() {
    return editedTimeSheet.value.weekOf
      ? new Date(editedTimeSheet.value.weekOf).toISOString().split('T')[0] // Format as 'YYYY-MM-DD'
      : '';
  },
  set(value) {
    editedTimeSheet.value.weekOf = new Date(value); // Convert back to Date object
  }
});

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

// Open the confirmation modal
const openConfirmModal = () => {
  showConfirmModal.value = true;
};

// Action to perform on confirm
const submitAction = () => {
  // Add the code for what happens when the timesheet is submitted here
  showConfirmModal.value = false; // Close the modal after confirming
  console.log('Timesheet submitted successfully!');
};

const closeModal = () => {
  isModalVisible.value = false;
};

const saveChanges = () => {
  if (validateEntries()) {
    store.commit('timeSheets/updateTimeSheet', editedTimeSheet.value);
    isEditing.value = false;
  } else {
    // Generate validationErrorsList with day-of-week formatting
    validationErrorsList.value = Object.keys(validationErrors.value).map((key) => {
      const [_, index] = key.split('_'); // Split key to get field and index
      const entryIndex = parseInt(index, 10);

      // Calculate the date and day of the week for this entry
      const entryDate = new Date(startOfWeek.value);
      entryDate.setDate(entryDate.getDate() + entryIndex);
      const dayOfWeek = entryDate.toLocaleDateString('en-US', { weekday: 'long' });

      // Format the error message with day information
      return `${dayOfWeek}: ${validationErrors.value[key]}`;
    });

    // Show alert modal with formatted errors
    showAlertModal.value = true;
    isEditing.value = true; // Stay in edit mode
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
    additionalQualifiers: { perDiem: 0, dayOrNight: DayOrNight.Day }
  };
  editedTimeSheet.value.entries.push(newEntry);
};


// Utility function to calculate the Monday of the current week
function getStartOfWeek(date: Date) {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}

// Method to get the name of the day by index
const getDayName = (index: number) => {
  const day = new Date(startOfWeek.value);
  day.setDate(startOfWeek.value.getDate() + index);
  return day.toLocaleDateString("en-US", { weekday: "long" });
};

const approvalStatus = computed({
  get() {
    const approvals = editedTimeSheet.value.approvals;
    if (!approvals || approvals.length === 0) return 'Pending';
    return approvals[approvals.length - 1].status;
  },
  set(value) {
    const newApproval = { timeStamp: new Date(), status: value };
    editedTimeSheet.value.approvals.push(newApproval);
  }
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

.table-heading-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-button,
.add-button,
.submit-button {
  font-size: 1rem;
  padding: 8px;
  margin: 8px;
}

.add-button {
  margin: 0;
}

.footer-buttons-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}
</style>
