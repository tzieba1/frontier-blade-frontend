import { Module } from 'vuex';
import { RootState, AuthState } from '@/store/types';

export const authModule: Module<AuthState, RootState> = {
  namespaced: true,
  state: {
    role: 'none',
    user: null,
    isAuthenticated: false,
  },
  mutations: {
    login(state, payload) {
      console.log('Login mutation triggered', payload);
      state.role = payload.role;
      state.user = payload.user;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.role = 'none';
      state.user = null;
      state.isAuthenticated = false;
    }
  },
  getters: {
    role: state => state.role,
    user: state => state.user,
    isAuthenticated: state => state.isAuthenticated,
  }
}