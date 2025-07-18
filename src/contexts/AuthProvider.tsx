'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { UserType } from '@/types/UserType'
import { LoginParams, ErrCallbackType } from '@/types/Auth'
import { usePathname, useRouter } from 'next/navigation'
import { AuthValueType } from '@/types/Auth'
import Api from '@/shared/utils/api'
import { CookiesStorage } from '@/shared/utils/cookie'
import { AuthService } from '@/shared/services/auth.services'


const defaultProvider: AuthValueType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  isAuthenticated: false,
  hasRole: () => false,
  hasPermission: () => false,
  canAccess: () => false,
  fallback: '/login',
}

const AuthContext = createContext(defaultProvider);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  useEffect(() => {
    Api.post('auth/me').then((res) => {
      AuthService.setAccessToken(res.data.accessToken)
    }).then(() => {
      Api.get('auth/me').then((res) => {
        console.log(res.headers) //get accessToken from headers
      })
    })

  }, [])

  function HandleLogin(params: LoginParams, errorCallback?: ErrCallbackType) {

  }

  const HandleLogout = () => {

  }

  const hasRole = (roles: UserType['role']) => {
    if (!user) return false
    return roles.includes(user.role)
  }

  const hasPermission = (permissions: string[]) => {
    if (!user || !user.permissions) return false
    return permissions.every(permission => (user.permissions ?? []).includes(permission))
  }

  const canAccess = (roles?: UserType['role'], permissions?: string[]) => {
    if (!user) return false
    const hasRoles = roles ? roles.includes(user.role) : true
    const hasPermissions = permissions ? permissions.every(permission => (user.permissions ?? []).includes(permission)) : true
    return hasRoles && hasPermissions
  }

  const value: AuthValueType = {
    user,
    loading,
    setUser,
    setLoading,
    login: HandleLogin,
    logout: HandleLogout,
    isAuthenticated: false,
    hasRole,
    hasPermission,
    canAccess,
    fallback: '/login',
  }

  return <AuthContext.Provider
    value={{
      ...value,
      hasRole: (roles: UserType['role']) => {
        return value.user ? roles.includes(value.user.role) : false;
      },
      hasPermission: (permissions: string[]) => {
        const userPermissions = value.user?.permissions ?? [];
        return permissions.every(permission =>
          userPermissions.includes(permission)
        );
      },
    }}
  >
    {children}
  </AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
