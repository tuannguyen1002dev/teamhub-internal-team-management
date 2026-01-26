'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useValidateToken } from '../hooks/useValidateToken';
import LoadingState from '@/components/basics/LoadingState'
import ErrorState from '@/components/basics/ErrorState'
import GreatingNewUser from './GreatingNewUser'
import { ShieldX } from 'lucide-react'
import { useAuth } from '@/contexts/AuthProvider'

export function AcceptInvitationView() {
  const auth = useAuth()
  const token = useSearchParams().get('token')
  const router = useRouter()
  const { status, email, message } = useValidateToken(token)

  if (status === 'loading') return <LoadingState waitingMessages="Verifying your invitation" />
  if (status === 'error') return <ErrorState icon={ShieldX} ErrorMessage={message} />

  function onSetupAccepted() {
    auth.isAuthenticated ? router.push('/login') : router.push(`/setup-account?token=${token}`)
  }

  return (
    <GreatingNewUser email={email} onContinue={() => onSetupAccepted()} />
  )
}
