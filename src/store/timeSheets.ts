// store/timeSheets.ts
import { Module } from 'vuex';
import { RootState } from './types';
import { TimeSheetsState, TimeSheet } from './types';

export const timeSheetsModule: Module<TimeSheetsState, RootState> = {
  namespaced: true,
  state: {
    timeSheets: [
      { id: 1, employeeName: 'Jaden Nelson', dateRange: 'Oct 7-13', hoursWorked: 40 },
      { id: 2, employeeName: 'Remington Meekins', dateRange: 'Oct 7-13', hoursWorked: 35 },
      { id: 3, employeeName: 'Ben Christink', dateRange: 'Oct 7-13', hoursWorked: 42 },
      { id: 4, employeeName: 'Ryan Kipfer', dateRange: 'Oct 7-13', hoursWorked: 38 },
    ],
  },
  getters: {
    timeSheets: (state) => state.timeSheets,
    timeSheetById: (state) => (id: number) => state.timeSheets.find(timeSheet => timeSheet.id === id),
  },
  actions: {
    submitTimeSheet({ commit }, timeSheet: TimeSheet) {
      commit('addTimeSheet', timeSheet);
    },
    exportTimeSheetsToExcel(_, timeSheets: TimeSheet[]) {
      // Implement logic for exporting timeSheets to Excel
      console.log('Exporting:', timeSheets);
    },
    updateTimeSheet({ commit }, updatedTimeSheet: TimeSheet) {
      commit('updateTimeSheet', updatedTimeSheet);
    }
  },
  mutations: {
    addTimeSheet(state, timeSheet: TimeSheet) {
      state.timeSheets.push({
        id: state.timeSheets.length + 1,
        ...timeSheet
      });
    },
    updateTimeSheet(state, updatedTimeSheet: TimeSheet) {
      const index = state.timeSheets.findIndex(ts => ts.id === updatedTimeSheet.id);
      if (index !== -1) {
        state.timeSheets.splice(index, 1, updatedTimeSheet);
      }
    }
  }
};
