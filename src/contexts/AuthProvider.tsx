'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { UserType } from '@/types/UserType'
import { LoginParams, ErrCallbackType } from '@/types/Auth'
import { usePathname, useRouter } from 'next/navigation'
import { AuthValueType, JwtPayload } from '@/types/Auth'
import Api from '@/shared/utils/api'
import { AuthService } from '@/shared/services/auth.services'


const defaultProvider: AuthValueType = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  setAuthState: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  hasRole: () => false,
  hasPermission: () => false,
  canAccess: () => false,
  fallback: '/login',
}

const AuthContext = createContext(defaultProvider);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()
  const router = useRouter()
  const [authState, setAuthState] = useState<{
    user: JwtPayload | null;
    isLoading: boolean;
    isAuthenticated: boolean
  }>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  });

  function adaptUtil(updates: Partial<AuthValueType> | { [K in keyof AuthValueType]?: AuthValueType[K] }) {
    return setAuthState(prev => ({ ...prev, ...updates }));
  }

  useEffect(() => {
    AuthInit()

  }, [])

  //!: Main auth functions
  async function AuthInit(): Promise<void> {
    if (AuthService.getAccessToken() && AuthService.getUserAccount() && authState.user !== AuthService.getUserAccount()) {
      adaptUtil({ 'isLoading': true })
      AuthService.authMe(AuthService.getAccessToken()).then((res) => {
        console.log(res)
        adaptUtil({
          isLoading: true,
          user: res.data
        })
      }).catch((errRes) => {
        console.log(errRes)
        AuthService.reAuthMe(AuthService.getAccessToken()).then((res) => {
          AuthService.setAccessToken(res.data.accessToken)
          AuthService.setRefAccessToken(res.data.accessToken)
          AuthInit();
        }).catch((errRes) => {
          AuthService.clearAccessToken()
          AuthService.clearUserAccount()
          adaptUtil({
            user: null,
            isLoading: true
          })
          router.push(auth.fallback)
        })
      })


    } else {
      AuthService.clearAccessToken()
      AuthService.clearUserAccount()
      adaptUtil({ user: null })
    }
    AuthInit()
  }

  // TODO: 
  function HandleLogin(params: LoginParams, errorCallback?: ErrCallbackType) {
    AuthService.logMeIn(params).then((res) => {
      console.log(res.data)
    }).catch((errRes) => {
      console.log(errRes.data)
    })
  }

  const HandleLogout = () => {

  }

  const hasRole = (roles: UserType['role']) => {
    if (!authState.user) return false
    return roles.includes(authState.user.role)
  }

  const hasPermission = (permissions: string[]) => {
    if (!authState.user || !authState.user.permissions) return false
    const userPermissions = values.user?.permissions ?? [];
    return permissions.every(permission =>
      userPermissions.includes(permission)
    );
  }

  const canAccess = (roles?: UserType['role'], permissions?: string[]) => {
    if (roles && permissions && authState.user?.role && authState.user?.permissions) {
      roles.includes(authState.user.role)
      const userPermissions = values.user?.permissions ?? [];
      return permissions.every(permission => userPermissions.includes(permission));
    }
  }

  const values = {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    setAuthState: () => adaptUtil,
    login: HandleLogin,
    logout: HandleLogout,
    hasRole: () => false,
    hasPermission: () => false,
    canAccess: () => false,
    fallback: '/login',
  }

  return <AuthContext.Provider value={values}>
    {children}
  </AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
