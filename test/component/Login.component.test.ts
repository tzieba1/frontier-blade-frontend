import { render, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import Login from '@/pages/Login.vue';

describe('Login.vue', () => {
  it('renders login form', () => {
    const { getByPlaceholderText, getByRole } = render(Login);

    // Check if input fields are rendered correctly
    expect(getByPlaceholderText('Enter username')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter password')).toBeInTheDocument();

    // Use getByRole to target the button element instead of getByText
    expect(getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows error when invalid login is attempted', async () => {
    const { getByText, getByPlaceholderText, getByRole } = render(Login);

    // Simulate entering invalid credentials
    await fireEvent.update(getByPlaceholderText('Enter username'), 'wronguser');
    await fireEvent.update(getByPlaceholderText('Enter password'), 'wrongpassword');

    // Click the login button
    fireEvent.click(getByRole('button', { name: /login/i }));

    // Check if the error message is displayed (assuming the component shows an error for invalid login)
    // Wait for a few seconds for this to occur asynchronously
    await new Promise((resolve) => setTimeout(resolve, 1500));
    expect(getByText('Invalid credentials')).toBeInTheDocument();
  });
});
