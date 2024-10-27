<template>
  <tr>
    <td class="table-data-heading">{{ getTimeSheetCategory(fieldKey) }}</td>
    <td class="table-data-heading"><span :title="fieldLabel">{{ fieldLabel }}</span></td>

    <!-- Data Columns for Each Entry -->
    <td v-for="(entry, index) in entries" :key="index" class="table-data-field">
      <!-- Display value when not editing or field is disabled -->
      <template v-if="!isEditing || disabled">
        <span :title="displayValue(entry)">{{ displayValue(entry) }}</span>
      </template>

      <!-- Editable field when editing and not disabled -->
      <template v-else>
        <div class="input-container">
          <!-- Placeholder text for empty fields that are not text-based -->
          <span class="placeholder-text" 
                v-if="getNestedFieldValue(entry, fieldKey) instanceof Date || typeof getNestedFieldValue(entry, fieldKey) === 'number' || fieldKey === 'additionalQualifiers.dayOrNight'">{{ placeholder }}</span>

          <!-- Date Input -->
          <input v-if="getNestedFieldValue(entry, fieldKey) instanceof Date" type="date"
            :value="getNestedFieldValue(entry, fieldKey)"
            @input="(event) => updateFieldValue(index, (event.target as HTMLInputElement).value)" />

          <!-- Numeric Input -->
          <input v-else-if="typeof getNestedFieldValue(entry, fieldKey) === 'number'" type="number"
            :value="getNestedFieldValue(entry, fieldKey)" min="0" step="0.01"
            @input="(event) => updateFieldValue(index, parseFloat((event.target as HTMLInputElement).value))" />

          <!-- Day/Night Dropdown -->
          <select v-else-if="fieldKey === 'additionalQualifiers.dayOrNight'"
            :value="getNestedFieldValue(entry, fieldKey)"
            @change="(event) => updateFieldValue(index, (event.target as HTMLSelectElement).value)">
            <option value="Day">Day</option>
            <option value="Night">Night</option>
          </select>

          <!-- Text Input with Placeholder -->
          <input v-else type="text" :value="getNestedFieldValue(entry, fieldKey)" :placeholder="placeholder"
            @input="(event) => updateFieldValue(index, (event.target as HTMLInputElement).value)" />

          <!-- Expand Button for text fields only -->
          <button v-if="!(getNestedFieldValue(entry, fieldKey) instanceof Date
                          || typeof getNestedFieldValue(entry, fieldKey) === 'number'
                          || fieldKey === 'additionalQualifiers.dayOrNight')" 
                  class="expand-button" @click="toggleModal" aria-label="Expand for detailed entry">
            🔍
          </button>
        </div>

        <!-- Text Entry Modal for expanded input -->
        <TextEntryModal v-if="showModal" :initialText="getNestedFieldValue(entry, fieldKey)?.toString() || ''"
          :isVisible="showModal" @update:text="(newText) => updateFieldValue(index, newText)"
          @close="showModal = false" />
      </template>
    </td>

    <!-- Totals column -->
    <td class="totals-column">{{ calculateTotal }}</td>

    <!-- Validation column -->
    <td class="error">
      <template v-if="validationError">
        <span>❌ {{ validationError }}</span>
      </template>
      <template v-else>
        <span>✅</span>
      </template>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue';
import TextEntryModal from './TextEntryModal.vue';
import { TimeSheetEntry } from '@/store/types';
import { TimeSheetCategory } from '@/store/enums';

const props = defineProps<{
  fieldLabel: string;
  entries: TimeSheetEntry[];
  fieldKey: string;
  isEditing: boolean;
  placeholder: string;
  validationErrors: Record<string, string>;
  disabled?: boolean;
}>();

const showModal = ref(false);
const emit = defineEmits<{
  (e: 'update', payload: { index: number; updatedEntry: TimeSheetEntry }): void;
}>();

function toggleModal() {
  showModal.value = !showModal.value;
}

function updateFieldValue(index: number, newValue: any) {
  const updatedEntry = { ...props.entries[index] };
  setNestedFieldValue(updatedEntry, props.fieldKey, newValue);
  emit('update', { index, updatedEntry });
}

// Helper function to access nested values in a safe way
function getNestedFieldValue(entry: any, fieldKey: string): any {
  return fieldKey.split('.').reduce((obj, key) => obj?.[key], entry);
}

// Helper function to set a nested field
function setNestedFieldValue(obj: any, fieldKey: string, value: any) {
  const keys = fieldKey.split('.');
  const lastKey = keys.pop();
  let nested = obj;
  for (const key of keys) {
    if (!(key in nested)) nested[key] = {};
    nested = nested[key];
  }
  if (lastKey) nested[lastKey] = value;
}

const displayValue = (entry: TimeSheetEntry) => {
  const value = getNestedFieldValue(entry, props.fieldKey);
  return value instanceof Date ? value.toISOString().split('T')[0] : value;
};

function getTimeSheetCategory(fieldKey: string): TimeSheetCategory {
  if (fieldKey.includes("billable")) {
    return TimeSheetCategory.Billable;
  }
  if (fieldKey.includes("nonBillable")) {
    return TimeSheetCategory.NonBillable;
  }
  if (fieldKey.includes("additionalQualifiers")) {
    return TimeSheetCategory.Qualifiers;
  }
  return TimeSheetCategory.General;
}

const calculateTotal = computed(() => {
  const total = props.entries.reduce((acc, entry) => {
    const value = getNestedFieldValue(entry, props.fieldKey);
    return acc + (typeof value === 'number' ? value : 0);
  }, 0);

  // Check if any entries have a numeric value for this fieldKey
  const hasNumericValues = props.entries.some(entry => typeof getNestedFieldValue(entry, props.fieldKey) === 'number');

  return hasNumericValues ? total : '-';
});

// Retrieve validation error for the entire row
const validationError = computed(() => {
  return props.entries
    .map((_, index) => props.validationErrors[`${props.fieldKey}_${index}`])
    .find(Boolean);
});
</script>

<style scoped>
/* Style .table-data-field to not wrap and be the length of the largest text */
.table-data-heading {
  font-weight: bold;
  white-space: nowrap;
}

.table-data-field {
  min-width: 175px;
  height: 1.67rem;
  text-overflow: ellipsis;
}

.table-data-field,
.error {
  white-space: nowrap;
  overflow: scroll;
  max-width: 175px;
  /* Adjust as needed for current cell layout */
}

.error span {
  display: inline-block;
  margin: auto;
}

.totals-column {
  text-align: center;
  font-weight: bold;
  background-color: #c1c1c1;
  color: #333;
}

.input-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.expand-button {
  padding: 0;
  margin-left: 8px;
  cursor: pointer;
  background: none;
  border: none;
  color: #007bff;
  font-size: 1.2em;
}

.error {
  color: #bf0e0e;
  font-size: 0.9em;
  text-align: center;
  overflow: scroll;
}

.placeholder-text {
  font-weight: 700;
  font-size: 0.67em;
  pointer-events: none;
  margin-right: 8px;
  text-align: center;
}

input {
  width: 100%;
}
</style>
