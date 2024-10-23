import { render, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import App from '@/App.vue';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import {routes} from '@/router'; // Assuming you have a router config

describe('Navigation based on roles', () => {
  const createVuexStore = (role, isAuthenticated) => {
    return createStore({
      state: {
        role,
        isAuthenticated,
      },
      getters: {
        role: (state) => state.role,
        isAuthenticated: (state) => state.isAuthenticated,
      },
      mutations: {
        logout: (state) => {
          state.role = '';
          state.isAuthenticated = false;
        }
      }
    });
  };

  const createVueRouter = () => {
    return createRouter({
      history: createWebHistory(),
      routes, // Use your actual router config here
    });
  };

  it('redirects admin/accountant to the dashboard', async () => {
    const store = createVuexStore('admin', true);
    const router = createVueRouter();

    const { getByText } = render(App, {
      global: {
        plugins: [store, router], // Provide both store and router
      },
    });

    expect(getByText('Dashboard')).toBeInTheDocument();
  });

  it('redirects employee to the timesheet page', async () => {
    const store = createVuexStore('employee', true);
    const router = createVueRouter();

    const { getByText } = render(App, {
      global: {
        plugins: [store, router], // Provide both store and router
      },
    });

    expect(getByText('Timesheet')).toBeInTheDocument();
  });
});
