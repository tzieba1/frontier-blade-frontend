import { ApprovalStatus } from "./enums";

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
  firstName: string;
  lastName: string;
  role: "admin" | "accountant" | "employee" | "supervisor";
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
  type: "full-time" | "part-time" | "casual";
}

export interface Approval {
  id: number;
  entries: TimeSheetEntry[];
  timeSheetId: number;
  approver: User;
  status: ApprovalStatus;
  comments: string;
  timeStamp: Date;
}

export interface TimeSheet {
  id: number;
  approvals: Approval[];
  employee: Employee;
  entries: TimeSheetEntry[];
}

export interface TimeSheetEntry {
  id: number;
  timeSheetId: number;
  date: Date;
  customerName: string;
  comments: string;
  rates: Rates;
  perDiem: boolean;
  holiday: boolean;
}

export interface Rates {
  onSite: number;
  standby: number;
}