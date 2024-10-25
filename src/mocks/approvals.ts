import { mockUsers } from "./users";

export const mockApprovals = [
  {
    id: 1,
    timeSheetId: 0,
    isApproved: true,
    approver: mockUsers[0],
    approvalDate: new Date('2024-10-13')
  },
  {
    id: 1,
    timeSheetId: 0,
    isApproved: false,
    approver: mockUsers[0],
    approvalDate: new Date('2024-10-13')
  },
]