<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username</label>
        <input v-model="username" id="username" placeholder="Enter username" />
      </div>
      <div>
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" placeholder="Enter password" />
      </div>
      <button type="submit" :disabled="loading">Login</button>
      <p v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/services/authService';

// Form state
const username = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

// Router
const router = useRouter();

const handleLogin = async () => {
  error.value = '';
  loading.value = true;
  
  try {
    const user = await login(username.value, password.value);
    // Navigate based on role
    if (user.role === 'admin' || user.role === 'accountant') {
      router.push('/dashboard');
    } else if (user.role === 'employee') {
      router.push('/timesheet');
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
