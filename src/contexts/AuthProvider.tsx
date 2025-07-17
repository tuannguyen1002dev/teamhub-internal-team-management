'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { UserType } from '@/types/UserType'
import { LoginParams, ErrCallbackType } from '@/types/Auth'
import { usePathname, useRouter } from 'next/navigation'
import { AuthValueType } from '@/types/Auth'
import Api from '@/shared/api'
import { CookiesStorage } from '@/shared/cookie'

const defaultProvider: AuthValueType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  isAuthenticated: false,
  hasRole: () => false,
  hasPermission: () => false,
  canAccess: () => false,
  fallback: '/login',
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [isInitialized, setIsInitialized] = useState<boolean>(defaultProvider.isInitialized)

  useEffect(() => {
    Api.post('auth/me').then((res) => {
      CookiesStorage.setAccessToken(res.data.accessToken)
    }).then(() => {
      Api.get('auth/me').then((res) => {
        console.log(res.headers) //get accessToken from headers
      })
    })

  }, [])

  const loginHandler = (params: LoginParams, errorCallback?: ErrCallbackType) => {

    localStorage.setItem('authUser', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('authUser')
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

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login: loginHandler,
    logout,
    hasRole,
    hasPermission,
    canAccess,
    fallback: '/login',
  }

  return <AuthContext.Provider value={{
    ...value,
    hasRole: (roles: UserType['role']) => {
      if (!user) return false
      return roles.includes(user.role)
    },
    hasPermission(permissions) {
      if (!user || !user.permissions) return false
      return permissions.every(permission => (user.permissions ?? []).includes(permission))
    },
  }}>
    {children}
  </AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
