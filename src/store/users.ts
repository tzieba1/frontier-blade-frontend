// store/users.ts
import { Module } from 'vuex';
import { RootState, User, UsersState } from './types';
import { mockUsers } from '@/mocks/users';

export const usersModule: Module<UsersState, RootState> = {
  namespaced: true,
  state: {
    users: mockUsers, // initialize with mock or empty data
  },
  getters: {
    users: (state) => state.users,
    userById: (state) => (id: number) => state.users.find(user => user.id === id),
  },
  actions: {
    fetchUsers({ commit }) {
      // Logic to fetch and set users
    },
    addUser({ commit }, user: User) {
      commit('addUser', user);
    },
    updateUser({ commit }, updatedUser: User) {
      commit('modifyUser', updatedUser);
    },
    deleteUser({ commit }, userId: number) {
      commit('removeUser', userId);
    }
  },
  mutations: {
    addUser(state, user: User) {
      state.users.push({ id: state.users.length + 1, ...user });
    },
    modifyUser(state, updatedUser: User) {
      const index = state.users.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser);
      }
    },
    removeUser(state, userId: number) {
      state.users = state.users.filter(user => user.id !== userId);
    }
  }
};
