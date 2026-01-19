'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AccountType } from '@/types/UserType'
import { LoginParams, ErrCallbackType } from '@/types/Auth'
import { usePathname, useRouter } from 'next/navigation'
import { AuthValueType, JwtPayload } from '@/types/Auth'
import Api from '@/shared/utils/api'
import { AuthService } from '@/shared/services/auth.services'


const defaultProvider: AuthValueType = {
  account: null,
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
    account: JwtPayload | null;
    isLoading: boolean;
    isAuthenticated: boolean
  }>({
    account: null,
    isLoading: true,
    isAuthenticated: false
  });

  function adaptUtil(updates: Partial<AuthValueType> | { [K in keyof AuthValueType]?: AuthValueType[K] }) {
    return setAuthState(prev => ({ ...prev, ...updates }));
  }

  useEffect(() => {
    // AuthInit()

  }, []);

  //!: Main auth functions
  async function AuthInit(): Promise<void> {

    console.log("Auth Init called")

    if (AuthService.getAccessToken() && AuthService.getUserAccount() && authState.account !== AuthService.getUserAccount()) {
      adaptUtil({ 'isLoading': true })
      AuthService.authMe(AuthService.getAccessToken()).then((res) => {
        adaptUtil({
          isLoading: true,
          account: res.data
        })
      }).catch((errRes) => {
        AuthService.reAuthMe(AuthService.getAccessToken()).then((res) => {
          AuthService.setAccessToken(res.data.accessToken)
          AuthService.setRefAccessToken(res.data.accessToken)
        }).catch((errRes) => {
          AuthService.clearAccessToken()
          AuthService.clearUserAccount()
          adaptUtil({
            account: null,
            isLoading: true
          })
          router.push(auth.fallback)
        })
      })


    } else {
      AuthService.clearAccessToken()
      AuthService.clearUserAccount()
      adaptUtil({ account: null })
    }
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

  const hasRole = (roles: AccountType['role']) => {
    if (!authState.account) return false
    return roles.includes(authState.account.role)
  }

  const hasPermission = (permissions: string[]) => {
    if (!authState.account || !authState.account.permissions) return false
    const accountPermissions: any = values.account?.permissions ?? [];
    return permissions.every(permission =>
      accountPermissions.includes(permission)
    );
  }

  const canAccess = (roles?: AccountType['role'], permissions?: string[]) => {
    if (roles && permissions && authState.account?.role && authState.account?.permissions) {
      roles.includes(authState.account.role)
      const accountPermissions: any = values.account?.permissions ?? [];
      return accountPermissions.every((permission: string[]) => accountPermissions?.includes(permission));
    }
  }

  const values = {
    account: authState.account,
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
