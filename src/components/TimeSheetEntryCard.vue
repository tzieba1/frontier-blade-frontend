<template>
  <Card>
    <template #header>
      <div>{{ formattedDate }}</div>
    </template>

    <!-- Editable Fields -->
    <div class="card-content" v-if="isEditing">
      <p>
        <strong>Customer:</strong>
        <input type="text" v-model="editedEntry.customerName" placeholder="Customer Name" />
      </p>
      <p>
        <strong>Comments:</strong>
        <textarea v-model="editedEntry.comments" placeholder="Comments" />
      </p>
      <p>
        <strong>Hours On-Site:</strong>
        <input type="number" min="0" step="0.25" v-model="editedEntry.rates.onSite" placeholder="On-Site Rate" />
      </p>
      <p>
        <strong>Hours Standby:</strong>
        <input type="number" min="0" step="0.25" v-model="editedEntry.rates.standby" placeholder="Standby Rate" />
      </p>
      <p>
        <strong>Per Diem:</strong>
        <input type="checkbox" v-model="editedEntry.perDiem" />
      </p>
      <p>
        <strong>Holiday:</strong>
        <input type="checkbox" v-model="editedEntry.holiday" />
      </p>
    </div>

    <!-- Display Fields -->
    <div class="card-content" v-else>
      <p><strong>Customer:</strong> {{ entry.customerName }}</p>
      <p><strong>Comments:</strong> {{ entry.comments }}</p>
      <p><strong>Hours On-Site:</strong> {{ entry.rates.onSite }}</p>
      <p><strong>Hours Standby:</strong> {{ entry.rates.standby }}</p>
      <p><strong>Per Diem:</strong> {{ entry.perDiem ? "Yes" : "No" }}</p>
      <p><strong>Holiday:</strong> {{ entry.holiday ? "Yes" : "No" }}</p>
    </div>

    <!-- Footer Actions -->
    <template v-if="approvalStatus === ApprovalStatus.Pending || approvalStatus === ApprovalStatus.Rejected" #footer>
      <button v-if="isEditing" @click="saveEntry">Save 💾</button>
      <button @click="toggleEditMode">{{ isEditing ? "Cancel ↩️" : "Edit ✏️" }}</button>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import Card from '@/components/Card.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { TimeSheetEntry } from '@/store/types';
import { ApprovalStatus } from '@/store/enums';

const props = defineProps<{ 
  entry: TimeSheetEntry,
  approvalStatus: string 
}>();

const isEditing = ref(false);
const store = useStore();
const editedEntry = ref({ ...props.entry });

// Format date to a readable string format
const formattedDate = computed(() => {
  return props.entry.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
});

const toggleEditMode = () => {
  isEditing.value = !isEditing.value;

  // Reset edited entry every time from properties
  editedEntry.value = { ...props.entry };
};

const saveEntry = () => {
  store.commit('timeSheets/updateTimeSheetEntry', editedEntry.value);
  isEditing.value = false;
};

</script>

<style scoped>
.card-content p {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 0;
  text-wrap: nowrap;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

textarea, input[type="text"], input[type="number"] {
  margin-left: 16px;
  width: 100%;
  resize: vertical;
}
</style>