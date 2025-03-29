export interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  dateJoined: string
}

export const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    dateJoined: '2024-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Customer',
    status: 'Inactive',
    dateJoined: '2024-03-22',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    role: 'Customer',
    status: 'Active',
    dateJoined: '2024-04-10',
  },
  {
    id: 4,
    name: 'Bob Brown',
    email: 'bob.brown@example.com',
    role: 'Admin',
    status: 'Active',
    dateJoined: '2024-05-30',
  },
  {
    id: 5,
    name: 'Charlie White',
    email: 'charlie.white@example.com',
    role: 'Customer',
    status: 'Banned',
    dateJoined: '2024-06-20',
  },
]
