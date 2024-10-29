<template>
  <div>
    <h1>TimeSheet Details</h1>
    <h2 class="employee-heading">
      <span>{{ timeSheet.employee.user.firstName }} {{ timeSheet.employee.user.lastName }}</span>
      <span class="employee-number">(ID #{{ timeSheet.employee.number }})</span>
    </h2>

    <div class="container">
      <!-- Using Card component with header, default content, and footer slots -->
      <Card>
        <template #header>
          <div>Summary </div>
        </template>

        <div class="card-content">
          <!-- Week of Dropdown -->
          <p><strong>Week Of:</strong>
            <select v-model="selectedMonday">
              <option v-for="monday in mondaysOfYear" :key="monday" :value="monday">
                {{ monday }}
              </option>
            </select>
          </p>
          <p><strong>Comments:</strong>
            <textarea v-if="isEditing && (isAdmin || isSupervisor)" v-model="editedTimeSheet.comments" />
            <p v-else>{{ timeSheet.comments }}</p>
          </p>
          <p><strong>Approval Status:</strong>
            <select v-model="approvalStatus" v-if="isEditing && (isAdmin || isSupervisor)">
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <p v-else>{{ approvalStatus }}</p>
          </p>
        </div>

        <template v-if="isAdmin || isEmployee || isSupervisor" #footer>
          <button v-if="isAdmin || isSupervisor" @click="toggleEditMode">
            {{ isEditing ? "Save 💾" : "Edit ✏️" }}
          </button>

          <button @click="openConfirmModal"
              :disabled="approvalStatus === ApprovalStatus.Approved"
              v-if="isEmployee">
              {{ approvalStatus === ApprovalStatus.Approved ? "Submitted" :
              "Submit ✉️"}}
            </button>
        </template>
      </Card>

      <div v-for="day in daysOfWeek" :key="day.getDay()" class="timesheet-entry">
        <TimeSheetEntryCard v-if="weekEntries[day.toISOString().split('T')[0]]"
          :entry="weekEntries[day.toISOString().split('T')[0]]" 
          :approvalStatus="approvalStatus"
        />
        <button class="add-entry-btn" v-else @click="addPlaceholderEntry(day)">
          ➕ {{day.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })}}
        </button>
      </div>
    </div>


    <div class="footer-buttons-container">
      <router-link to="/timesheets" v-slot="{ href, navigate, isActive, isExactActive }">
        <a :href="href" @click="navigate" :class="{ active: isActive, exactActive: isExactActive }" class="back-link">
          Back to TimeSheets
        </a>
      </router-link>
    </div>
  </div>

  <!-- Text Entry Modal -->
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
import { computed, onUnmounted, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import TextEntryModal from '@/components/TextEntryModal.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
// import TimeSheetRow from '@/components/TimeSheetRow.vue';
import Card from '@/components/Card.vue';
import AlertModal from '@/components/AlertModal.vue';
import TimeSheetEntryCard from '@/components/TimeSheetEntryCard.vue';
import { TimeSheetEntry } from '@/store/types';
import { ApprovalStatus } from '@/store/enums';

const showAlertModal = ref(false);  // Track alert modal visibility
const validationErrorsList: Ref<string[]> = ref([]);  // List of validation errors for modal
const isSmallScreen = ref(false);

const store = useStore();
const route = useRoute();

// Fetch the timesheet details based on the route param 'id' using namespaced getter
const timeSheet = computed(() => {
  const timeSheetId = Number(route.params.id);
  return store.getters['timeSheets/timeSheetById'](timeSheetId);
});

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 500; // Adjust the width as needed
};

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize);
});

// Generate Mondays in UTC for the current year
const getMondaysOfCurrentYear = () => {
  const year = new Date().getUTCFullYear();
  const mondays = [];
  let date = new Date(Date.UTC(year, 0, 1));

  // Move to the first Monday in UTC
  date.setUTCDate(date.getUTCDate() + ((1 - date.getUTCDay() + 7) % 7));

  // Collect all Mondays of the year in UTC format
  while (date.getUTCFullYear() === year) {
    mondays.push(date.toISOString().split('T')[0]); // Store dates as 'YYYY-MM-DD' in UTC
    date.setUTCDate(date.getUTCDate() + 7);
  }

  // Find the Monday of the current week
  const today = new Date();
  const todayDay = today.getUTCDay();
  const currentWeekMonday = new Date(today);
  currentWeekMonday.setUTCDate(today.getUTCDate() - todayDay + (todayDay === 0 ? -6 : 1)); // Adjust to Monday in UTC

  // Format current week Monday in 'YYYY-MM-DD' format
  const formattedCurrentMonday = currentWeekMonday.toISOString().split('T')[0];

  // Set the selectedMonday to the Monday of the current week, if it exists in the year's Mondays
  selectedMonday.value = mondays.includes(formattedCurrentMonday) ? formattedCurrentMonday : mondays[0];

  return mondays;
};

const selectedMonday = ref<string | null>(new Date().toISOString().split('T')[0]); // Initialize as null to ensure it waits for mondaysOfYear
const mondaysOfYear = computed(() => getMondaysOfCurrentYear());

// Adjust daysOfWeek to use the selectedMonday as the start date in local time
const daysOfWeek = computed(() => {
  if (!selectedMonday.value) return [];
  const start = new Date(selectedMonday.value);
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(start);
    day.setDate(day.getDate() + i); // Correctly handle day increments in local time
    return day;
  });
});

const addPlaceholderEntry = (day: Date) => {
  console.log(`Add entry for ${day.toUTCString().split('T')[0]}`);
  // Future functionality for adding an entry on this day
  const newEntry = {
    id: timeSheet.value.entries.length + 1,
    timeSheetId: timeSheet.value.id,
    date: day,
    customerName: '',
    comments: '',
    rates: { onSite: 0, standby: 0 },
    perDiem: false,
    holiday: false,
  }
  timeSheet.value.entries.push(newEntry);

  // Use a Vuex mutation to add the entry
  store.commit('timeSheets/addTimeSheetEntry', { timeSheetId: timeSheet.value.id, entry: newEntry });
};

// Filter entries by selected week in UTC
const weekEntries = computed(() => {
  const entries = timeSheet.value.entries;
  const weekEntriesMap: Record<string, TimeSheetEntry> = {}; // Use Record type for string keys and TimeSheetEntry values

  daysOfWeek.value.forEach(day => {
    const entry = entries.find((entry: TimeSheetEntry) =>
      entry.date.toISOString().split('T')[0] === day.toISOString().split('T')[0]
    );
    if (entry) {
      weekEntriesMap[day.toISOString().split('T')[0]] = entry;
    }
  });

  return weekEntriesMap;
});

// Fetch the user's role from the store
const isAdmin = computed(() => store.getters['auth/role'] === 'admin');
const isSupervisor = computed(() => store.getters['auth/role'] === 'supervisor');
const isEmployee = computed(() => store.getters['auth/role'] === 'employee');

// Edit mode and edited timesheet with validation
const isEditing = ref(false);
const editedTimeSheet = ref({ ...timeSheet.value });
const validationErrors = ref<Record<string, string>>({});

// Modal State
const isModalVisible = ref(false);
const modalText = ref('');
const modalField = ref('');
const modalIndex = ref(0);
const showConfirmModal = ref(false);

// Add the logic for date calculations
const startOfWeek = ref(getStartOfWeek(timeSheet.value.weekOf || new Date()));

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

// Save changes to the timesheet entry
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

// Utility function to calculate the Monday of the current week
function getStartOfWeek(date: Date) {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}

// Approval status computed property
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
  font-size: 36px;
}

h2 {
  display: flex;
  justify-content: space-between;
}

.card-content p {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin: 0;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.add-entry-btn {
  padding: 32px;
  width: 100%;
  background-color: #e2e2e2;
  color: #333;
  border-radius: 16px;
  border: 4px dashed #333;
  font-size: 1.2rem;
}

.add-entry-btn:hover {
  background-color: #d1d1d1;
  cursor: pointer;
}

.employee-heading {
  display: flex;
  gap: 8px;
  align-items: center;
}

.employee-number {
  font-style: italic;
}

.footer-buttons-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 32px;
  background-color: #e2e2e2;
  border-radius: 8px;
  padding: 24px;
}

textarea {
  resize: vertical; 
  width: 100%; /* Ensures it fills the container without overflowing */
}

</style>
