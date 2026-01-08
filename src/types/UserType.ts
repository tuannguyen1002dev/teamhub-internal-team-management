type AccountRole = 'sudo' | 'admin' | 'manager' | 'operator' | 'user'

export type AccountType = {
  id: string
  username: string;
  email: string;
  dateofbirth: Date;
  passwords: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  role: AccountRole
  permissions?: PermissionsModel
}

type PermissionAction = 'read' | 'write' | 'update' | 'delete' | 'manage'
type PermissionResource = 'sudo' | 'admin' | 'manager' | 'operator' | 'user'


export type PermissionsModel = {
  [R in PermissionResource]?: PermissionAction[]
}