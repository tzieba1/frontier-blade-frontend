import { describe, it, expect } from 'vitest';
import { login } from '@/services/authService';
import { mockUsers } from '@/mocks/users';

describe('authService', () => {
  it('logs in with valid credentials', async () => {
    const user = await login(mockUsers[0].username, '');
    expect(user).toEqual(mockUsers[0]);
  });

  it('throws an error with invalid credentials', async () => {
    await expect(login('unknown@test.ca', 'password')).rejects.toThrow('Invalid credentials');
  });
});