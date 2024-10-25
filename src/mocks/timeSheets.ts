import { TimeSheet } from "@/store/types";

export const mockTimeSheets: TimeSheet[] = [{
  id: 1,
  approverId: null,
  employeeId: 101,
  employeeName: 'Jaden Nelson',
  employeeNumber: 1001,
  employeeType: 'full-time',
  dateRange: 'Oct 7-13',
  weekOf: new Date('2024-10-07'),
  hoursWorked: 40,
  comments: 'Completed tasks on time',
  isApproved: false,
  approvalDate: null,
  entries: [
    {
      id: 1,
      timeSheetId: 1,
      date: new Date('2024-10-07'),
      workOrder: 'WO12345',
      customerName: 'ABC Corp',
      shopComments: 'Routine maintenance',
      suggestedSalesPart: 'SP123',
      nonBillable: {
        rate2ST: 0,
        rate2OT: 0,
        comments: 'Training'
      },
      billable: {
        rate1ST: 8,
        rate1OT: 2,
        rate2ST: 0,
        rate2OT: 0,
        vacation: 0,
        sick: 0,
        holiday: 0
      },
      additionalQualifiers: {
        perDiem: 50,
        dayOrNight: 1
      }
    }
  ],
  totals: {
    nonBillable: {
      rate2ST: 0,
      rate2OT: 0,
    },
    billable: {
      rate1ST: 8,
      rate1OT: 2,
      rate2ST: 0,
      rate2OT: 0,
      vacation: 0,
      sick: 0,
      holiday: 0
    },
    additionalQualifiers: {
      perDiem: 50,
      dayOrNight: 1
    }
  }
},
{
  id: 2,
  approverId: null,
  employeeId: 102,
  employeeName: 'Alexis Johnson',
  employeeNumber: 1002,
  employeeType: 'part-time',
  dateRange: 'Oct 7-13',
  weekOf: new Date('2024-10-07'),
  hoursWorked: 20,
  comments: 'Completed tasks on time',
  isApproved: false,
  approvalDate: null,
  entries: [
    {
      id: 1,
      timeSheetId: 2,
      date: new Date('2024-10-07'),
      workOrder: 'WO12346',
      customerName: 'XYZ Corp',
      shopComments: 'Routine maintenance',
      suggestedSalesPart: 'SP124',
      nonBillable: {
        rate2ST: 0,
        rate2OT: 0,
        comments: 'Training'
      },
      billable: {
        rate1ST: 8,
        rate1OT: 2,
        rate2ST: 0,
        rate2OT: 0,
        vacation: 0,
        sick: 0,
        holiday: 0
      },
      additionalQualifiers: {
        perDiem: 50,
        dayOrNight: 1
      }
    }
  ],
  totals: {
    nonBillable: {
      rate2ST: 0,
      rate2OT: 0,
    },
    billable: {
      rate1ST: 8,
      rate1OT: 2,
      rate2ST: 0,
      rate2OT: 0,
      vacation: 0,
      sick: 0,
      holiday: 0
    },
    additionalQualifiers: {
      perDiem: 50,
      dayOrNight: 1
    }
  }
}]