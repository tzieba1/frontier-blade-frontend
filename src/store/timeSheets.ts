// store/timeSheets.ts
import { Module } from 'vuex';
import { RootState } from './types';
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
