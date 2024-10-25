<template>
  <tr>
    <td class="table-data-heading"><span :title="fieldLabel">{{ fieldLabel }}</span></td>

    <!-- Data Columns for Each Entry -->
    <td v-for="(entry, index) in entries" :key="index" class="table-data-field">
      <!-- Display value when not editing -->
      <template v-if="!isEditing"><span :title="displayValue(entry)">{{ displayValue(entry) }}</span></template>

      <!-- Editable field when editing -->
      <template v-else>
        <div class="input-container">
          <!-- Date Input -->
          <input v-if="getNestedFieldValue(entry, fieldKey) instanceof Date" type="date"
            :value="getNestedFieldValue(entry, fieldKey)"
            @input="(event) => updateFieldValue(index, (event.target as HTMLInputElement).value)" />

          <!-- Numeric Input -->
          <input v-else-if="typeof getNestedFieldValue(entry, fieldKey) === 'number'" type="number"
            :value="getNestedFieldValue(entry, fieldKey)"
            @input="(event) => updateFieldValue(index, parseFloat((event.target as HTMLInputElement).value))" />

          <!-- Text Input -->
          <input v-else type="text" :value="getNestedFieldValue(entry, fieldKey)"
            @input="(event) => updateFieldValue(index, (event.target as HTMLInputElement).value)" />

          <button
            v-if="!(getNestedFieldValue(entry, fieldKey) instanceof Date || typeof getNestedFieldValue(entry, fieldKey) === 'number')"
            class="expand-button" @click="toggleModal" aria-label="Expand for detailed entry">
            🔍
          </button>
        </div>

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

const props = defineProps<{
  fieldLabel: string;
  entries: TimeSheetEntry[];
  fieldKey: string;
  isEditing: boolean;
  validationErrors: Record<string, string>;
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
  return value instanceof Date ? value.toLocaleDateString() : value;
};

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
  min-width:175px;
  height: 1.67rem;
  text-overflow: ellipsis;
}

.table-data-field, 
.error {
  white-space: nowrap;
  overflow: scroll;
  max-width: 175px; /* Adjust as needed for current cell layout */
}

.error span {
  display: inline-block;
  margin: auto;
}

table tr:last-child td:first-child {
    border-bottom-left-radius: 8px;
}
    
table tr:last-child td:last-child {
    border-bottom-right-radius: 8px;
}
td {
  border: 1px solid #666;
  padding: 8px;
  text-align: left;
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
</style>
