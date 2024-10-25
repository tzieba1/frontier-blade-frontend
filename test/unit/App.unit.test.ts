import { render } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import App from '@/App.vue';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/router'; // Assuming you have a router config

describe('App.vue with Vuex modules', () => {
  // Create Vuex Store with modules (including the auth module)
  const createVuexStore = (role, isAuthenticated) => {
    return createStore({
      modules: {
        auth: {
          namespaced: true, // Add namespacing
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
        }
      }
    });
  };

  // Create Vue Router instance
  const createVueRouter = () => {
    return createRouter({
      history: createWebHistory(),
      routes, // Use your actual router config here
    });
  };

  it('renders dashboard link for admin/accountant', () => {
    const store = createVuexStore('admin', true);
    const router = createVueRouter();

    const { getByText } = render(App, {
      global: {
        plugins: [store, router], // Provide both store and router
      },
    });

    // Expect to see the Dashboard link for admin/accountant
    expect(getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders TimeSheets link for employees', () => {
    const store = createVuexStore('employee', true);
    const router = createVueRouter();

    const { getByText } = render(App, {
      global: {
        plugins: [store, router], // Provide both store and router
      },
    });

    // Expect to see the Timesheets link for employees
    expect(getByText('TimeSheets')).toBeInTheDocument();
  });

  it('shows logout button when authenticated', () => {
    const store = createVuexStore('employee', true);
    const router = createVueRouter();

    const { getByText } = render(App, {
      global: {
        plugins: [store, router], // Provide both store and router
      },
    });

    // Expect to see the Logout button when the user is authenticated
    expect(getByText('Logout')).toBeInTheDocument();
  });
});
