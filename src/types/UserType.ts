type Role = 'sudo' | 'admin' | 'manager' | 'operator' | 'user'

export type UserType = {
  id: string
  username: string;
  email: string;
  dateOfBirth: Date;
  passwords: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  role: Role
  permissions?: string[]
}
