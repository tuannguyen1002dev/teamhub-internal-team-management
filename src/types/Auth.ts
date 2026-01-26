import { ReactNode } from 'react'
import { AccountType } from './UserType'

export type AuthGuardProps = {
  children: ReactNode
  redirectTo?: string
  requiredRoles?: string[]
  ruleCheck?: (account: any) => boolean
  fallback?: ReactNode
}

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string,
  password: string
}

export type AuthValueType = {
  account: JwtPayload | null
  isAuthenticated: boolean
  isLoading: boolean
  setAuthState: (updates: Partial<{ account: JwtPayload | null, isLoading: boolean, isAuthenticated: boolean }>) => Promise<void>;
  login: (params: LoginParams) => Promise<void>
  logout: () => Promise<void>
  hasRole: (roles: string | string[]) => boolean
  hasPermission: (permissions: string | string[]) => boolean
  canAccess: (roles?: string | string[], permissions?: string | string[]) => boolean
  fallback: string
}

type SafeAccountFields = 'id' | 'email' | 'username' | 'role' | 'permissions' | 'fullname';

export interface JwtPayload extends Pick<AccountType, SafeAccountFields> {
  iat?: number;
  exp?: number;
}

export interface AuthenticatedRequest extends Request {
  account?: JwtPayload;
}
