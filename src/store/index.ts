import { createStore } from 'vuex';

export const store = createStore({
  state: {
    role: '',
    isAuthenticated: false,
  },
  mutations: {
    login(state, payload) {
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
});