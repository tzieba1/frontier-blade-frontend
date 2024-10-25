<script setup lang="ts">
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

// Store and Router
const store = useStore();
const router = useRouter();

// Computed values to access Vuex state
const role = computed(() => store.getters['auth/role']);
const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);

const logout = () => {
  store.commit('auth/logout');
  router.push('/');
};

watch(
  [isAuthenticated, role],
  ([newAuth, newRole]) => {
    console.log('Auth status changed:', newAuth);
    console.log('Role changed:', newRole);
  },
  { immediate: true }
);

</script>

<template>
  <div>
      <nav>
        <ul>
          <!-- Logo from assets -->
          <li>
            <img src="/fbs.png" alt="Company Logo" height="100px" />
          </li>
          <!-- Make sure to use  when checking computed properties in the template -->
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

    <!-- Route Content -->
    <router-view />
  </div>
</template>

<style scoped>
nav {
  background-color: #333;
  padding: 10px;
}

nav ul {
  display: flex;
  justify-content: flex-start; /* Align items horizontally */
  align-items: center; /* Center items vertically */
  /* Center items horizontally */
  justify-content: center;
  list-style-type: none; /* Remove default bullet points */
  padding: 0;
  margin: 0;
}

li {
  margin-right: 20px; /* Add some spacing between all links except the first one */
}

li:first-child {
  margin-left: 20px; /* Push the logo to the left */
}

nav ul li a, nav ul li button {
  display: inline-flex; /* Use flexbox for consistent vertical alignment */
  align-items: center; /* Vertically center the text */
  justify-content: center; /* Center the text horizontally (if needed) */
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: #555;
  transition: background-color 0.3s ease;
  font-size: 16px; /* Ensure consistent font size */
  line-height: 1.2; /* Use a fixed line-height to handle descenders */
  height: 40px; /* Set a fixed height to ensure uniform box size */
  box-sizing: border-box;
}

nav ul li a:hover, nav ul li button:hover {
  background-color: #777; /* Change color on hover */
  cursor: pointer;
}

button {
  border: none;
  background: none;
  color: inherit;
  font: inherit;
}

</style>
