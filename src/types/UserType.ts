type Role = 'sudo' | 'admin' | 'manager' | 'operator' | 'user'

export type UserType = {
    email: string
    fullName?: string
    role: Role
    permissions?: string[]
}
