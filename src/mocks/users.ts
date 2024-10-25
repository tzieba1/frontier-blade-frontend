import { User } from '@/store/types';

export const mockUsers: User[] = [
	{
		id: 1,
		email: 'admin@test.ca',
		role: 'admin',
		username: 'admin@test.ca',
		firstName: 'Admin',
		lastName: 'User'
	},
	{
		id: 2,
		email: 'accountant@test.ca',
		role: 'accountant',
		username: 'accountant@test.ca',
		firstName: 'Accountant',
		lastName: 'User'
	},
	{
		id: 3,
		email: 'employee1@test.ca',
		role: 'employee',
		username: 'employee1@test.ca',
		firstName: 'Employee 1',
		lastName: 'User'
	},
  {
    id: 4,
    email: 'employee2@test.ca',
    role: 'employee',
    username: 'employee2',
    firstName: 'Employee 2',
    lastName: 'User'
  },
  {
    id: 5,
    email: 'employee3@test.ca',
    role: 'employee',
    username: 'employee3',
    firstName: 'Employee 3',
    lastName: 'User'
  },
];
