// store/timeSheets.ts
import { Module } from 'vuex';
import { RootState, TimeSheetEntry } from './types';
import { TimeSheetsState, TimeSheet } from './types';
import { mockTimeSheets } from '@/mocks/timeSheets';

const timeSheets = [...mockTimeSheets];

export const timeSheetsModule: Module<TimeSheetsState, RootState> = {
  namespaced: true,
  state: {
    timeSheets: timeSheets,
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
    }
  },
  mutations: {
    addTimeSheet(state, timeSheet: TimeSheet) {
      state.timeSheets.push({
        id: state.timeSheets.length + 1,
        ...timeSheet
      });
    },
    addTimeSheetEntry(state, { timeSheetId, entry }) {
      const timesheet = state.timeSheets.find(ts => ts.id === timeSheetId);
      if (timesheet) {
        timesheet.entries.push(entry);
      }
    },
    updateTimeSheet(state, updatedTimeSheet) {
      const index = state.timeSheets.findIndex(ts => ts.id === updatedTimeSheet.id);
      if (index !== -1) {
        state.timeSheets.splice(index, 1, {
          ...state.timeSheets[index],
          ...updatedTimeSheet,
          approvals: [...updatedTimeSheet.approvals] // Ensure approvals is updated fully
        });
      }
    },
    submitTimeSheet(state, timeSheet: TimeSheet) {
      state.timeSheets.push(timeSheet);
    },
    exportTimeSheetsToExcel(_, timeSheets: TimeSheet[]) {
      // Implement logic for exporting timeSheets to Excel
      console.log('Exporting:', timeSheets);
    },
    updateTimeSheetEntry(state, updatedEntry: TimeSheetEntry) {
      const timeSheet = state.timeSheets.find(ts => ts.id === updatedEntry.timeSheetId);
      if (timeSheet) {
        const entryIndex = timeSheet.entries.findIndex(e => e.id === updatedEntry.id);
        if (entryIndex !== -1) {
          timeSheet.entries.splice(entryIndex, 1, updatedEntry);
        }
      }
    }
  }
};
