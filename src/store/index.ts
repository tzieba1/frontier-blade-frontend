import { createStore, Store, useStore as baseUseStore } from 'vuex';

import { authModule } from '@/store/auth';
import { timeSheetsModule } from '@/store/timeSheets';
import { RootState } from './types';


export function useStore(): Store<RootState> {
  return baseUseStore();
}

export const store = createStore<RootState>({
  modules: {
    auth: authModule,
    timeSheets: timeSheetsModule,
  }
});