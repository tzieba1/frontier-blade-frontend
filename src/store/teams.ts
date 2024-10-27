// store/teams.ts
import { Module } from 'vuex';
import { RootState, Team, Employee, TeamsState } from './types';

export const teamsModule: Module<TeamsState, RootState> = {
  namespaced: true,
  state: {
    teams: [], // initialize with an empty array or mock data
  },
  getters: {
    teams: (state) => state.teams,
    teamById: (state) => (id: number) => state.teams.find(team => team.id === id),
  },
  actions: {
    createTeam({ commit }, team: Team) {
      commit('addTeam', team);
    },
    updateTeam({ commit }, updatedTeam: Team) {
      commit('modifyTeam', updatedTeam);
    },
    deleteTeam({ commit }, teamId: number) {
      commit('removeTeam', teamId);
    },
    assignUserToTeam({ commit }, { teamId, employee }: { teamId: number; employee: Employee }) {
      commit('addMemberToTeam', { teamId, employee });
    },
    unassignUserFromTeam({ commit }, { teamId, employeeId }: { teamId: number; employeeId: number }) {
      commit('removeMemberFromTeam', { teamId, employeeId });
    }
  },
  mutations: {
    addTeam(state, team: Team) {
      state.teams.push({ id: state.teams.length + 1, ...team });
    },
    modifyTeam(state, updatedTeam: Team) {
      const index = state.teams.findIndex(team => team.id === updatedTeam.id);
      if (index !== -1) {
        state.teams.splice(index, 1, updatedTeam);
      }
    },
    removeTeam(state, teamId: number) {
      state.teams = state.teams.filter(team => team.id !== teamId);
    },
    addMemberToTeam(state, { teamId, employee }) {
      const team = state.teams.find(team => team.id === teamId);
      if (team) {
        team.members.push(employee);
      }
    },
    removeMemberFromTeam(state, { teamId, employeeId }) {
      const team = state.teams.find(team => team.id === teamId);
      if (team) {
        team.members = team.members.filter(member => member.id !== employeeId);
      }
    }
  }
};
