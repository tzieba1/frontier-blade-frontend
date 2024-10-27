<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <input v-model="username" id="username" placeholder="Username" />
      </div>
      <div>
        <input v-model="password" type="password" id="password" placeholder="Password" />
      </div>
      <button type="submit" :disabled="loading">Login</button>
      <p v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { login } from '@/services/authService';

const username = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const store = useStore();
const router = useRouter();

const handleLogin = async () => {
  error.value = '';
  loading.value = true;

  try {
    const user = await login(username.value, password.value);

    // First, commit the role to Vuex store
    store.commit('auth/login', { role: user.role, user: user });

    // Next, navigate to the appropriate route
    if (user.role === 'admin' || user.role === 'accountant') {
      router.push('/dashboard');
    } else if (user.role === 'employee') {
      router.push('/timesheets');
    }
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Add some basic styling */
</style>
