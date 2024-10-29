import { TimeSheet } from '@/store/types';
import { mockEmployees } from './employees';
import { mockApprovals } from './approvals';

export const mockTimeSheets: TimeSheet[] = [
	{
		id: 1,
		approvals: [mockApprovals[0]],
		employee: mockEmployees[0],
		entries: [
			{
				id: 1,
				timeSheetId: 1,
				date: new Date('2024-10-07'),
				customerName: 'ABC Corp',
				comments: 'Routine maintenance',
				rates: {
					onSite: 0,
					standby: 0,
				},
				perDiem: false,
				holiday: false
			}
		]
	},
	{
		id: 2,
		approvals: [],
		employee: mockEmployees[1],
		entries: [
			{
				id: 2,
				timeSheetId: 2,
				date: new Date('2024-10-07'),
				customerName: 'XYZ Corp',
				comments: 'Routine maintenance',
				rates: {
					onSite: 0,
					standby: 0,
				},
				perDiem: false,
				holiday: false
			}
		]
	},
	{
		id: 3,
		approvals: [mockApprovals[1]],
		employee: mockEmployees[2],
		entries: [
			{
				id: 3,
				timeSheetId: 2,
				date: new Date('2024-10-07'),
				customerName: 'XYZ Corp',
				comments: 'Routine maintenance',
				rates: {
					onSite: 0,
					standby: 0,
				},
				perDiem: false,
				holiday: false
			}
		]
	}
];
