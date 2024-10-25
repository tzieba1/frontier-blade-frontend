import { Module } from 'vuex';
import { RootState, AuthState } from '@/store/types';

export const authModule: Module<AuthState, RootState> = {
  namespaced: true,
  state: {
    role: '',
    isAuthenticated: false,
  },
  mutations: {
    login(state, payload) {
      console.log('Login mutation triggered', payload);
      state.role = payload.role;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.role = '';
      state.isAuthenticated = false;
    }
  },
  getters: {
    role: state => state.role,
    isAuthenticated: state => state.isAuthenticated,
  }
}