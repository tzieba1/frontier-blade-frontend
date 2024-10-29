import { mockUsers } from '@/mocks/users';
import { User } from '@/store/types';

// Simulate a login request with a delay
export function login(email: string, password: string): Promise<User> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			// Iterate over the values of mockUsers to find a matching user by email
			const user = mockUsers.find(u => u.email === email);

			// Check if the user exists and if the password is correct (you can extend this logic)
			if (user && password === '') {
				// Assume 'password' as the correct password for now
				resolve(user);
			} else {
				reject(new Error('Invalid credentials'));
			}
		}, 1000); // Simulate network delay
	});
}
