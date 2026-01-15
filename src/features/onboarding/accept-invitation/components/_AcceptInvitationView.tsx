// app/(public)/accept-invitation/page.tsx
'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useAcceptInvitation } from '@/features/onboarding/accept-invitation/hooks/useAcceptInvitation'
import { LoadingState } from './LoadingState'
import { ErrorState } from './ErrorState'
import { SuccessState } from './SuccessState'

export function AcceptInvitationView() {
  const token = useSearchParams().get('token')
  const router = useRouter()
  const { status, email, message } = useAcceptInvitation(token)

  if (status === 'loading') return <LoadingState />
  if (status === 'error') return <ErrorState message={message} />

  function onSetupAccepted() {

    router.push('/setup-account')
  }

  return (
    <SuccessState email={email} onContinue={() => onSetupAccepted()} />
  )
}
