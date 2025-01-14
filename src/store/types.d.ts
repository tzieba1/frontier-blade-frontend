import { ApprovalStatus, DayOrNight } from "./enums";

export interface RootState {
  auth: AuthState;
  timeSheets: TimeSheetsState;
  teams: TeamsState;
  users: UsersState;
}

export interface AuthState {
  role: "admin" | "accountant" | "employee" | "none";
  user?: User;
  isAuthenticated: boolean;
}

export interface TimeSheetsState {
  timeSheets: TimeSheet[];
}

export interface TeamsState {
  teams: Team[];
}

export interface UsersState {
  users: User[];
}

export interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: "admin" | "accountant" | "employee" | "none";
}

export interface Team {
  [key: string]: any;
  id: number;
  name: string;
  members: Employee[];
}

export interface Employee {
  id: number;
  user: User;
  number: number;
  type: "full-time" | "part-time" | "casual";
}

export interface Approval {
  id: number;
  timeSheetId: number;
  approver: User;
  status: ApprovalStatus;
  comments: string;
  timeStamp: Date;
}

export interface TimeSheet {
  [key: string]: any; 
  id: number;
  approvals: Approval[];
  employee: Employee;
  weekOf: Date;
  comments: string;
  entries: TimeSheetEntry[];
  totals: TimeSheetTotals;
  ccq: CCQ;
}

export interface TimeSheetEntry {
  [key: string]: any; 
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
  [key: string]: any; 
  rate1ST: number;
  rate1OT: number;
  rate2ST: number;
  rate2OT: number;
  vacation: number;
  sick: number;
  holiday: number;
}

export interface NonBillableFields {
  [key: string]: any; 
  rate2ST: number;
  rate2OT: number;
  comments?: string; // Optional because it may not be used in totals
}

export interface AdditionalQualifierFields {
  [key: string]: any; 
  perDiem: number;
  dayOrNight: DayOrNight;
}

export interface CCQ {
  [key: string]: any; 
  id: number;
  isDiver: boolean;
  isRopes: boolean;
  rate: "hourly" | "salary";
}

export interface TimeSheetTotals {
  [key: string]: any; 
  nonBillable: NonBillableFields; 
  billable: BillableFields; 
  additionalQualifiers: AdditionalQualifierFields;
}
