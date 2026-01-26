"use client"

import { createContext, useContext } from 'react'
import { useAccount } from './useAccount'
import type { AccountContextValue } from '../../domain/types'


const AccountContext = createContext<AccountContextValue | null>(null)

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const value = useAccount()
  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  )
}

export function useAccountContext() {
  const ctx = useContext(AccountContext)
  if (!ctx) {
    throw new Error(
      'useUserContext must be used within UserProvider'
    )
  }
  return ctx
}
