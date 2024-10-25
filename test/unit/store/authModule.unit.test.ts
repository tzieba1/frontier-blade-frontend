import { describe, it, expect } from 'vitest';
import { createStore } from 'vuex';
import { authModule } from '@/store/auth'; // Assuming authModule is separated
import { RootState } from '@/store/types'; // Import the root state type

describe('Vuex: auth module', () => {
  it('should set role and isAuthenticated on login', () => {
    const store = createStore<RootState>({
      modules: {
        auth: authModule
      }
    });

    // Simulate the login mutation
    store.commit('auth/login', { role: 'admin' });

    // Assert that the state has been updated correctly
    expect(store.state.auth.role).toBe('admin');
    expect(store.state.auth.isAuthenticated).toBe(true);
  });

  it('should reset state on logout', () => {
    const store = createStore({
      modules: {
        auth: authModule
      }
    });

    // Simulate the logout mutation
    store.commit('auth/logout');

    // Assert that the state has been reset correctly
    expect(store.state.auth.role).toBe('');
    expect(store.state.auth.isAuthenticated).toBe(false);
  });
});