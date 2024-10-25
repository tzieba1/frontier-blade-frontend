import { Employee } from '@/store/types';
import { mockUsers } from './users';

export const mockEmployees: Employee[] = [
	{ id: 1, user: mockUsers[2], number: 1 },
	{ id: 2, user: mockUsers[3], number: 2 },
	{ id: 3, user: mockUsers[4], number: 3 }
];
