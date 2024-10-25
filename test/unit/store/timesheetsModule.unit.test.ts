import { describe, it, expect } from 'vitest';
import { createStore } from 'vuex';
import { timeSheetsModule } from '@/store/timeSheets';

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
    const store = createStore({
      modules: {
        timeSheets: timeSheetsModule
      }
    });

    expect(store.state.timeSheets.timeSheets).toEqual([
      { id: 1, employeeName: 'Jaden Nelson', dateRange: 'Oct 7-13', hoursWorked: 40 },
      { id: 2, employeeName: 'Remington Meekins', dateRange: 'Oct 7-13', hoursWorked: 35 },
      { id: 3, employeeName: 'Ben Christink', dateRange: 'Oct 7-13', hoursWorked: 42 },
      { id: 4, employeeName: 'Ryan Kipfer', dateRange: 'Oct 7-13', hoursWorked: 38 },
    ]);
  });

  it('should return all timeSheets', () => {
    const store = createStore({
      modules: {
        timeSheets: timeSheetsModule
      }
    });

    const timeSheets = store.getters['timeSheets/timeSheets'];
    expect(timeSheets.length).toBe(4);
  });

  it('should return a timeSheet by id', () => {
    const store = createStore({
      modules: {
        timeSheets: timeSheetsModule
      }
    });

    // Call the timeSheetById getter with id 1
    const timeSheet = store.getters['timeSheets/timeSheetById'](1);
    expect(timeSheet).toEqual({ id: 1, employeeName: 'Jaden Nelson', dateRange: 'Oct 7-13', hoursWorked: 40 });
  });

  it('should return undefined for a non-existent id', () => {
    const store = createStore({
      modules: {
        timeSheets: timeSheetsModule
      }
    });

    // Call the timeSheetById getter with a non-existent id
    const timeSheet = store.getters['timeSheets/timeSheetById'](-1);
    expect(timeSheet).toBeUndefined();
  });

  it('should add a new timeSheet', () => {
    const store = createStore({
      modules: {
        timeSheets: timeSheetsModule
      }
    });

    store.commit('timeSheets/addTimeSheet', { employeeName: 'New Employee', dateRange: 'Oct 14-20', hoursWorked: 40 });
    
    expect(store.state.timeSheets.timeSheets.length).toBe(5);
    expect(store.state.timeSheets.timeSheets[4]).toEqual({
      id: 5,
      employeeName: 'New Employee',
      dateRange: 'Oct 14-20',
      hoursWorked: 40
    });
  });

  it('should update an existing timeSheet', () => {
    const store = createStore({
      modules: {
        timeSheets: timeSheetsModule
      }
    });

    const updatedTimeSheet = { id: 2, employeeName: 'Updated Employee', dateRange: 'Oct 7-13', hoursWorked: 36 };
    store.commit('timeSheets/updateTimeSheet', updatedTimeSheet);

    expect(store.state.timeSheets.timeSheets[1]).toEqual(updatedTimeSheet);
  });

  it('should commit addTimeSheet when submitTimeSheet is called', () => {
    store.dispatch('timeSheets/submitTimeSheet', { employeeName: 'Another Employee', dateRange: 'Oct 14-20', hoursWorked: 40 });

    // Expect 6 after adding (non-zero indexed id)
    expect(store.state.timeSheets.timeSheets.length).toBe(6); 
    expect(store.state.timeSheets.timeSheets[5]).toEqual({
      id: 6,
      employeeName: 'Another Employee',
      dateRange: 'Oct 14-20',
      hoursWorked: 40
    });
  });

  it('should log export timeSheets to Excel', () => {
    const store = createStore({
      modules: {
        timeSheets: timeSheetsModule
      }
    });

    const consoleSpy = vi.spyOn(console, 'log');
    const timeSheets = store.state.timeSheets.timeSheets;

    store.dispatch('timeSheets/exportTimeSheetsToExcel', timeSheets);
    expect(consoleSpy).toHaveBeenCalledWith('Exporting:', timeSheets);
  });
});
