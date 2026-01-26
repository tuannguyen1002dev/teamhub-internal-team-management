export type AccountRole = 'ADMIN' | 'USER' | 'OPERATOR'

export interface AccountType {
  id: string;
  email: string;
  fullname?: string | null;
  username?: string | null;
  role: AccountRole;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
  dateofbirth?: Date | null;
  phone?: string | null;
  address?: string | null;
}

export type PermissionAction = 'read' | 'write' | 'update' | 'delete' | 'manage'
export type PermissionResource = 'sudo' | 'admin' | 'manager' | 'operator' | 'user'

export type PermissionsModel = {
  [R in PermissionResource]?: PermissionAction[]
}