import { ApprovalStatus } from "@/store/enums";
import { mockUsers } from "./users";

export const mockApprovals = [
  {
    id: 1,
    timeSheetId: 0,
    entries: [],
    status: ApprovalStatus.Approved,
    approver: mockUsers[0],
    comments: `Approved by ${mockUsers[0].firstName + ' ' + mockUsers[0].lastName}.`,
    timeStamp: new Date('2024-10-13T10:00:00Z') // ISO 8601 format with UTC timezone
  },
  {
    id: 2,
    timeSheetId: 0,
    entries: [],
    status: ApprovalStatus.Rejected,
    approver: mockUsers[0],
    comments: `Rejected by ${mockUsers[0].firstName + ' ' + mockUsers[0].lastName}.`,
    timeStamp: new Date('2024-10-13T15:30:00Z') // ISO 8601 format with UTC timezone
  },
  {
    id: 3,
    timeSheetId: 0,
    entries: [],
    status: ApprovalStatus.Pending,
    approver: mockUsers[0],
    comments: `Changes made by employee. Last rejected by ${mockUsers[0].firstName + ' ' + mockUsers[0].lastName}.`,
    timeStamp: new Date('2024-10-13T16:00:00Z') // ISO 8601 format with UTC timezone
  }
]