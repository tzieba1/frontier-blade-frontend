import { TimeSheet } from '@/store/types';
import { mockEmployees } from './employees';
import { mockApprovals } from './approvals';
import { DayOrNight } from '@/store/enums';

export const mockTimeSheets: TimeSheet[] = [
	{
		id: 1,
		approvals: [mockApprovals[0]],
		employee: mockEmployees[0],
		weekOf: new Date('2024-10-07'),
		comments: '',
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
					dayOrNight: DayOrNight.Day
				}
			}
		],
		totals: {
			nonBillable: {
				rate2ST: 0,
				rate2OT: 0
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
				dayOrNight: DayOrNight.Day
			}
		}
	},
	{
		id: 2,
		approvals: [],
		employee: mockEmployees[1],
		weekOf: new Date('2024-10-07'),
		comments: 'Completed tasks on time',
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
					dayOrNight: DayOrNight.Day
				}
			}
		],
		totals: {
			nonBillable: {
				rate2ST: 0,
				rate2OT: 0
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
				dayOrNight: DayOrNight.Day
			}
		}
	}
];
