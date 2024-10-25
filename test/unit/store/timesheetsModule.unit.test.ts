import { describe, it, expect } from 'vitest';
import { createStore } from 'vuex';
import { timeSheetsModule } from '@/store/timeSheets';
import { mockTimeSheets } from '@/mocks/timesheets';

describe('Vuex: timeSheetsModule', () => {
	let store;

	beforeEach(() => {
		// Re-create the store before each test to avoid state pollution
		store = createStore({
			modules: {
				timeSheets: timeSheetsModule
			}
		});
	});

	it('should have initial timeSheets', () => {
		expect(store.state.timeSheets.timeSheets).toEqual(mockTimeSheets);
	});

	it('should return all timeSheets', () => {
		const timeSheets = store.getters['timeSheets/timeSheets'];
		expect(timeSheets.length).toBe(2);
	});

	it('should return a timeSheet by id', () => {
		// Call the timeSheetById getter with id 1
		const timeSheet = store.getters['timeSheets/timeSheetById'](1);
		expect(timeSheet).toEqual(mockTimeSheets[0]);
	});

	it('should return undefined for a non-existent id', () => {
		// Call the timeSheetById getter with a non-existent id
		const timeSheet = store.getters['timeSheets/timeSheetById'](-1);
		expect(timeSheet).toBeUndefined();
	});

	it('should add a new timeSheet', () => {
		const newTimeSheet = {
			id: 3,
			approverId: null,
			employeeId: 102,
			employeeName: 'John Alexis',
			employeeNumber: 1002,
			employeeType: 'casual',
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
						comments: ''
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
					perDiem: 160,
					dayOrNight: 1
				}
			}
		};

		store.commit('timeSheets/addTimeSheet', newTimeSheet);

		expect(store.state.timeSheets.timeSheets.length).toBe(mockTimeSheets.length + 1);
		expect(store.state.timeSheets.timeSheets[2]).toEqual(newTimeSheet);
	});

	it('should update an existing timeSheet', () => {
    // Create a new timeSheet object with updated values
		const updatedTimeSheet = { id: mockTimeSheets[1].id, employeeName: 'Updated Employee', dateRange: 'Oct 7-13', hoursWorked: 36 };
		store.commit('timeSheets/updateTimeSheet', updatedTimeSheet);

		expect(store.state.timeSheets.timeSheets[1]).toEqual(updatedTimeSheet);
	});

	it('should commit addTimeSheet when submitTimeSheet is called', () => {
    const newTimeSheet = {
      id: 3,
      approverId: null,
      employeeId: 102,
      employeeName: 'John Alexis',
      employeeNumber: 1002,
      employeeType: 'casual',
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
            comments: ''
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
          perDiem: 160,
          dayOrNight: 1
        }
      }
    };
		store.dispatch('timeSheets/submitTimeSheet', newTimeSheet);

    // Note that this is now 2 greater than mocks because we added a new timeSheet in the previous test
		expect(store.state.timeSheets.timeSheets.length).toBe(mockTimeSheets.length + 2);
		expect(store.state.timeSheets.timeSheets[mockTimeSheets.length]).toEqual(newTimeSheet);
	});

	it('should log export timeSheets to Excel', () => {
    // Spy on console.log to check if it's called with the correct argument
		const consoleSpy = vi.spyOn(console, 'log');
		const timeSheets = store.state.timeSheets.timeSheets;

		store.dispatch('timeSheets/exportTimeSheetsToExcel', timeSheets);
		expect(consoleSpy).toHaveBeenCalledWith('Exporting:', timeSheets);
	});
});
