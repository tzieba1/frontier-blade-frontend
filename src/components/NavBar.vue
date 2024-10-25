<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

// Access Vuex store and router
const store = useStore();
const router = useRouter();

// Computed values for auth state and user role
const role = computed(() => store.getters['auth/role']);
const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);

// Logout function
const logout = () => {
  store.commit('auth/logout');
  router.push('/');
};
</script>

<template>
  <nav>
    <ul>
      <li>
        <img src="/fbs.png" alt="Company Logo" height="100px" />
      </li>
      <li v-if="isAuthenticated && (role === 'admin' || role === 'accountant')">
        <router-link to="/dashboard">Dashboard</router-link>
      </li>
      <li v-if="isAuthenticated && (role === 'admin' || role === 'employee')">
        <router-link to="/timesheets">TimeSheets</router-link>
      </li>
      <li v-if="isAuthenticated">
        <button @click="logout">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  background-color: #c1c1c1;
  padding: 10px;
  border-radius: 8px;
}

nav ul {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  margin-right: 20px;
}

li:first-child {
  margin-left: 20px;
}

nav ul li a,
nav ul li button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: #333;
  transition: background-color 0.3s ease;
  font-size: 16px;
  line-height: 1.2;
  height: 40px;
  box-sizing: border-box;
}

nav ul li a:hover,
nav ul li button:hover {
  background-color: #777;
  cursor: pointer;
}

button {
  border: none;
  background: none;
  color: inherit;
  font: inherit;
}
</style>
