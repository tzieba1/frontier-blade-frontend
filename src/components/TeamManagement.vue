<template>
  <div v-if="isAuthenticated && role === 'admin'" class="team-management">
    <h2>Manage Teams</h2>
    <p>This section allows admins to create teams and manage employees.</p>

    <!-- Team Creation -->
    <div class="team-creation">
      <h3>Create a New Team</h3>
      <input v-model="newTeamName" placeholder="Enter team name" />
      <button @click="createTeam">Create Team</button>
    </div>

    <!-- Team List and Editing -->
    <div class="team-list">
      <h3>Existing Teams</h3>
      <ul>
        <li v-for="team in teams" :key="team.id">
          <span class="left-aligned-field">

            <input v-model="team.name" @blur="updateTeam(team)" />
          </span>
          <button @click="selectTeam(team)">Manage Members</button>
          <button @click="confirmDelete('team', team.id)">Delete</button>
        </li>
      </ul>
    </div>

    <!-- Manage Team Members -->
    <div v-if="selectedTeam" class="team-members-management">
      <h3>Manage Members for {{ selectedTeam.name }}</h3>
      <p>Add a member by selecting from drop-down options.</p>
      <select v-model="selectedUserId" @change="assignUserToTeam(selectedUserId)">
        <option disabled value="">Select a user to add</option>
        <option v-for="user in usersNotInTeam" :key="user.id" :value="user.id">
          {{ user.firstName }} {{ user.lastName }} ({{ user.role }})
        </option>
      </select>
      <ul>
        <li v-for="member in selectedTeam.members" :key="member.id">
          <span class="left-aligned-field">
            {{ member.user.firstName }} {{ member.user.lastName }}
          </span>
          <select v-model="member.user.role" @change="changeUserRole(member.user)">
            <option value="admin">Admin</option>
            <option value="accountant">Accountant</option>
            <option value="employee">Employee</option>
          </select>
          <button @click="confirmDelete('member', member.id)">Remove</button>
        </li>
      </ul>
    </div>

    <!-- Confirmation Modal -->
    <ConfirmationModal
      v-if="isModalVisible"
      :title="modalTitle"
      :description="modalDescription"
      :isVisible="isModalVisible"
      @confirm="handleConfirmAction"
      @close="isModalVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import { RootState, User, Team, Employee } from '@/store/types';

const store = useStore<RootState>();

// Computed values for authentication and role with explicit types
const role = computed<string>(() => store.getters['auth/role']);
const isAuthenticated = computed<boolean>(() => store.getters['auth/isAuthenticated']);

// Data for managing teams and users
const newTeamName = ref<string>('');
const selectedTeam = ref<Team | null>(null);
const selectedUserId = ref<number | null>(null);

// Modal state and configuration
const isModalVisible = ref(false);
const modalTitle = ref('Confirm Action');
const modalDescription = ref('');
const actionType = ref<string | null>(null);
const targetId = ref<number | null>(null);

// Load teams and users with explicit types
const teams = computed<Team[]>(() => store.getters['teams/teams']);
const users = computed<User[]>(() => store.getters['users/users']);

// Computed users that are not in the selected team
const usersNotInTeam = computed<User[]>(() => {
  return selectedTeam.value
    ? users.value.filter(
        user => !selectedTeam.value?.members.some(member => member.user.id === user.id)
      )
    : users.value;
});

// Actions for managing teams
const createTeam = (): void => {
  if (newTeamName.value) {
    store.dispatch('teams/createTeam', { name: newTeamName.value, members: [] });
    newTeamName.value = '';
  }
};

const updateTeam = (team: Team): void => {
  store.dispatch('teams/updateTeam', team);
};

// Open confirmation modal before deleting a team or member
const confirmDelete = (type: 'team' | 'member', id: number): void => {
  actionType.value = type;
  targetId.value = id;
  modalTitle.value = type === 'team' ? 'Delete Team' : 'Remove Member';
  modalDescription.value =
    type === 'team' ? 'Are you sure you want to delete this team?' : 'Are you sure you want to remove this member?';
  isModalVisible.value = true;
};

// Handle confirmed action from modal
const handleConfirmAction = (): void => {
  if (actionType.value === 'team' && targetId.value !== null) {
    store.dispatch('teams/deleteTeam', targetId.value);
  } else if (actionType.value === 'member' && selectedTeam.value && targetId.value !== null) {
    store.dispatch('teams/unassignUserFromTeam', { teamId: selectedTeam.value.id, employeeId: targetId.value });
  }
  isModalVisible.value = false; // Close modal after action
};

// Select a team and initialize members
const selectTeam = (team: Team): void => {
  selectedTeam.value = { ...team, members: team.members || [] }; // Ensure members is an array
};

// Assign a user to a team
const assignUserToTeam = (userId: number | null): void => {
  if (selectedTeam.value && userId) {
    const user = users.value.find((user) => user.id === userId);
    if (user) {
      const employee: Employee = { id: userId, user, number: 0, type: 'full-time' }; // Customize `number` and `type` as needed
      store.dispatch('teams/assignUserToTeam', { teamId: selectedTeam.value.id, employee });
      selectedUserId.value = null; // Reset selection
    }
  }
};

const changeUserRole = (user: User): void => {
  store.dispatch('users/updateUser', user);
};

// Watch for authentication and role changes
watch(
  [isAuthenticated, role],
  ([newAuth, newRole]) => {
    console.log('Auth status changed:', newAuth);
    console.log('Role changed:', newRole);
  },
  { immediate: true }
);
</script>

<style scoped>
.team-management {
  padding: 24px;
  max-width: 600px;
  margin: auto;
  background-color: #f5f5f5;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.team-management h2 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.team-management p {
  color: #666;
  font-size: 14px;
  margin-bottom: 24px;
}

.team-creation,
.team-list,
.team-members-management {
  background-color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.team-creation h3,
.team-list h3,
.team-members-management h3 {
  font-size: 18px;
  font-weight: 500;
  color: #444;
  margin-bottom: 12px;
}

input[type="text"] {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  margin: auto;
  margin-bottom: 8px;
  transition: border-color 0.3s;
}

input[type="text"]:focus {
  border-color: #007bff;
  outline: none;
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 8px;
}

button:hover {
  opacity: 0.9;
}

button.primary {
  background-color: #007bff;
  color: #ffffff;
}

button.danger {
  background-color: #dc3545;
  color: #ffffff;
}

button.secondary {
  background-color: #6c757d;
  color: #ffffff;
}

.team-list ul,
.team-members-management ul {
  list-style-type: none;
  padding: 0;
}

.team-list li,
.team-members-management li {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.team-members-management select {
  margin-right: 12px;
}
.left-aligned-field {
  color: #333;
  margin-right: auto;
}

</style>

