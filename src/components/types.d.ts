import { DefineComponent } from 'vue';

export interface ContentBlock {
  label: string;
  template: DefineComponent;
}

export interface Filters {
  employeeName: string;
  startDate: string | null;
  endDate: string | null;
  approvalStatus: 'approved' | 'pending' | '';
  hasComments: 'true' | 'false' | ''; // Empty string for "any"
}

export interface SortOptions {
  field: 'employee.user.username' | 'weekOf' | 'totals.billable.rate1ST' | 'totals.nonBillable.rate2ST';
  direction: 'asc' | 'desc';
}