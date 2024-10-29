import { User } from '@/store/types';

export const mockUsers: User[] = [
	{
		id: 1,
		email: 'admin@test.ca',
		role: 'admin',
		firstName: 'Admin',
		lastName: 'User'
	},
	{
		id: 2,
		email: 'accountant@test.ca',
		role: 'accountant',
		firstName: 'Accountant',
		lastName: 'User'
	},
	{
		id: 3,
		email: 'employee1@test.ca',
		role: 'employee',
		firstName: 'Employee 1',
		lastName: 'User'
	},
  {
    id: 4,
    email: 'employee2@test.ca',
    role: 'employee',
    firstName: 'Employee 2',
    lastName: 'User'
  },
  {
    id: 5,
    email: 'employee3@test.ca',
    role: 'employee',
    firstName: 'Employee 3',
    lastName: 'User'
  },
	{
		id: 6,
		email: 'super@test.ca',
		role: 'supervisor',
		firstName: 'Supervisor',
		lastName: 'User'
	}
];
