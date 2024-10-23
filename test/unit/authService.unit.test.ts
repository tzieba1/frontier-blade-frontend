import { describe, it, expect } from 'vitest';
import { login } from '@/services/authService';

describe('authService', () => {
  it('logs in with valid credentials', async () => {
    const user = await login('admin@test.ca', 'password');
    expect(user).toEqual({ username: 'admin@test.ca', role: 'admin' });
  });

  it('throws an error with invalid credentials', async () => {
    await expect(login('unknown@test.ca', 'password')).rejects.toThrow('Invalid credentials');
  });
});