// Mocked authentication service
export interface User {
  username: string;
  role: 'admin' | 'accountant' | 'employee';
}

const mockUsers: Record<string, User> = {
  adminUser: { username: 'admin@test.ca', role: 'admin' },
  accountantUser: { username: 'accountant@test.ca', role: 'accountant' },
  employeeUser: { username: 'employee@test.ca', role: 'employee' },
};

export function login(username: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Iterate over the values of mockUsers to find a matching user by username
      const user = Object.values(mockUsers).find(u => u.username === username);

      // Check if the user exists and if the password is correct (you can extend this logic)
      if (user && password === 'password') {  // Assume 'password' as the correct password for now
        resolve(user);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000); // Simulate network delay
  });
}
