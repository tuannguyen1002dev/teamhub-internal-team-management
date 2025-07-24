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
  //* main auth params
  user: JwtPayload | null
  isAuthenticated: boolean
  isLoading: boolean
  setAuthState: (
    user: JwtPayload | null,
    isLoading: boolean,
    isAuthenticated: boolean
  ) => void;
  //* Login / Logout
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  logout: () => void
  //* CALS
  hasRole: (roles: UserType['role']) => boolean
  hasPermission: (permissions: string[]) => boolean
  canAccess: (roles?: UserType['role'], permissions?: string[]) => boolean
  fallback: string
}

type SafeUserFields = 'id' | 'email' | 'username' | 'role' | 'permissions' | 'fullName';

export interface JwtPayload extends Pick<UserType, SafeUserFields> {
  iat?: number;
  exp?: number;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}
