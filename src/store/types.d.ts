export interface RootState {
  auth: AuthState;
  timeSheets: TimeSheetsState;
}

export interface AuthState {
  role: string;
  isAuthenticated: boolean;
}

export interface TimeSheet {
  id: number;
  employeeName: string;
  dateRange: string;
  hoursWorked: number;
}

export interface TimeSheetsState {
  timeSheets: TimeSheet[];
}