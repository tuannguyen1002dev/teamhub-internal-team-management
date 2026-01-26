'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AuthValueType, JwtPayload, LoginParams } from '@/types/Auth'
import { AuthService } from '@/shared/services/auth.services'

const AuthContext = createContext<AuthValueType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
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

  const refreshAuth = useCallback(async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const res = await AuthService.authMe();
      setAuthState({
        account: res.data.user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      setAuthState({
        account: null,
        isAuthenticated: false,
        isLoading: false
      });
    }
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  const login = async (params: LoginParams) => {
    try {
      await AuthService.logMeIn(params);
      await refreshAuth();
    } catch (error: any) {
      const message = error.response?.data?.error || 'Login failed';
      throw new Error(message);
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setAuthState({
        account: null,
        isAuthenticated: false,
        isLoading: false
      });
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const hasRole = (roles: string | string[]) => {
    if (!authState.account) return false;
    const rolesArray = Array.isArray(roles) ? roles : [roles];
    return rolesArray.includes(authState.account.role);
  };

  const hasPermission = (permissions: string | string[]) => {
    if (!authState.account || !authState.account.permissions) return false;
    const permsArray = Array.isArray(permissions) ? permissions : [permissions];
    return permsArray.every(p => authState.account?.permissions.includes(p));
  };

  const values: AuthValueType = {
    account: authState.account,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    login,
    logout,
    hasRole,
    hasPermission,
    canAccess: (roles, permissions) => {
      if (!roles && !permissions) return true;
      const roleMatch = roles ? hasRole(roles) : true;
      const permMatch = permissions ? hasPermission(permissions) : true;
      return roleMatch && permMatch;
    },
    fallback: '/login',
    setAuthState: async (updates) => {
      setAuthState(prev => ({ ...prev, ...updates }));
    }
  };

  return <AuthContext.Provider value={values}>
    {children}
  </AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
