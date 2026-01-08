"use client"

import { createContext, useContext } from 'react'
import { useInvitations } from './useInvitations'
import type { InvitationContextValue } from '../types'

const InvitationContext = createContext<InvitationContextValue | null>(null)

export function InvitationProvider({ children }: { children: React.ReactNode }) {
  const value = useInvitations()
  return (
    <InvitationContext.Provider value={value}>
      {children}
    </InvitationContext.Provider>
  )
}

export function useInvitationContext() {
  const ctx = useContext(InvitationContext)
  if (!ctx) {
    throw new Error(
      'useInvitationContext must be used within InvitationProvider'
    )
  }
  return ctx
}
