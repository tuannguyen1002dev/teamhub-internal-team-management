import { ReactNode } from 'react'
import { UserType } from './UserType'

export type AuthGuardProps = {
  children: ReactNode
  redirectTo?: string
  requiredRoles?: string[]
  ruleCheck?: (user: any) => boolean
  fallback?: ReactNode
}

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string,
  password: string
}
export type AuthValueType = {
  loading: boolean
  setLoading: (value: boolean) => void
  user: UserType | null
  setUser: (value: UserType | null) => void
  isAuthenticated: boolean
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  logout: () => void
  hasRole: (roles: UserType['role']) => boolean
  hasPermission: (permissions: string[]) => boolean
  canAccess: (roles?: UserType['role'], permissions?: string[]) => boolean
  fallback: string
}
