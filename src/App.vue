<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

// Store and Router
const store = useStore();
const router = useRouter();

// Getters for role and authentication status
const role = store.getters.role;
const isAuthenticated = store.getters.isAuthenticated;

const logout = () => {
  store.commit('logout');
  router.push('/');
};
</script>

<template>
  <div>
    <header>
      <nav>
        <ul>
          <li v-if="isAuthenticated && (role === 'admin' || role === 'accountant')">
            <router-link to="/dashboard">Dashboard</router-link>
          </li>
          <li v-if="isAuthenticated && role === 'employee'">
            <router-link to="/timesheet">Timesheet</router-link>
          </li>
          <li v-if="isAuthenticated">
            <button @click="logout">Logout</button>
          </li>
        </ul>
      </nav>
    </header>

    <!-- Route Content -->
    <router-view />
  </div>
</template>
