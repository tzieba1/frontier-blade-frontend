export interface RootState {
  auth: AuthState;
  timeSheets: TimeSheetsState;
}

export interface AuthState {
  role: string;
  isAuthenticated: boolean;
}

export interface User {
  id: number;
  email: string;
  username: string | null;
  firstName: string;
  lastName: string;
  role: "admin" | "accountant" | "employee";
}

export interface Team {
  id: number;
  name: string;
  members: Employee[];
}

export interface Employee {
  id: number;
  user: User;
  number: number;
}

export interface TimeSheet {
  id: number;
  employeeId: number;
  approverId: number | null;
  employeeName: string;
  employeeNumber: number;
  employeeType: "full-time" | "part-time" | "casual";
  dateRange: string;
  weekOf: Date;
  hoursWorked: number;
  comments: string;
  isApproved: boolean;
  approvalDate: Date | null;
  entries: TimeSheetEntry[];
  totals: TimeSheetTotals;
}

export interface TimeSheetEntry {
  id: number;
  timeSheetId: number;
  date: Date;
  workOrder: string;
  customerName: string;
  shopComments: string;
  suggestedSalesPart: string;
  nonBillable: NonBillableFields;
  billable: BillableFields;
  additionalQualifiers: AdditionalQualifierFields;
}

export interface BillableFields {
  rate1ST: number | null;
  rate1OT: number | null;
  rate2ST: number | null;
  rate2OT: number | null;
  vacation: number | null;
  sick: number | null;
  holiday: number | null;
}

export interface NonBillableFields {
  rate2ST: number | null;
  rate2OT: number | null;
  comments?: string; // Optional because it may not be used in totals
}

export interface AdditionalQualifierFields {
  perDiem: number | null;
  dayOrNight: number | null;
}

export interface TimeSheetTotals {
  nonBillable: NonBillableFields; 
  billable: BillableFields; 
  additionalQualifiers: AdditionalQualifierFields;
}

export interface TimeSheetsState {
  timeSheets: TimeSheet[];
}