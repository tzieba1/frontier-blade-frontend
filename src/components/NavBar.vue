<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

// Access Vuex store and router
const store = useStore();
const router = useRouter();

// State for navigation visibility
const showNav = ref(true);

// Computed values for auth state and user role
const role = computed(() => store.getters['auth/role']);
const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);

// Logout function
const logout = () => {
  store.commit('auth/logout');
  router.push('/');
};

const login = () => {
  router.push('/');
};

// Toggle navigation visibility
const toggleNav = () => {
  showNav.value = !showNav.value;
};
</script>

<template>
  <nav>
    <button @click="toggleNav" class="toggle-btn">
      <span>{{ !showNav ? "Menu ▶" : "Menu ◀️" }}</span>
    </button>
    <ul v-if="showNav">
      <li>
        <img src="/fbs.png" alt="Company Logo" height="64px" />
      </li>
      <li v-if="isAuthenticated && (role === 'admin' || role === 'accountant' || role === 'supervisor')">
        <router-link to="/dashboard">Dashboard</router-link>
      </li>
      <li v-if="isAuthenticated && (role === 'admin' || role === 'employee' || role === 'supervisor')">
        <router-link to="/timesheets">TimeSheets</router-link>
      </li>
      <li v-if="isAuthenticated">
        <button @click="logout">Logout</button>
      </li>
      <li v-else>
        <button @click="login">Login</button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  z-index: 1000;
  position: fixed;
  top: 8px;
  left: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #c1c1c1;
  border-radius: 8px;
}

img {
  margin: 0;
  padding: 0;
}

nav ul {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style-type: none;
  padding: 16px;
  margin: 0;
  gap: 16px;
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
}

nav ul li a:hover,
nav ul li button:hover {
  background-color: #777;
  cursor: pointer;
}
.toggle-btn {
  background: none;
  border: none;
  margin: 4px;
  text-align: left;
  cursor: pointer;
  font-size: 1em;
  padding: 2px;
  color: #3573b7;
}
</style>
