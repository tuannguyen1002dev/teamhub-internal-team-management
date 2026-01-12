// app/(public)/accept-invitation/page.tsx
'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useAcceptInvitation } from '@/features/onboarding/hooks/useAcceptInvitation'
import { LoadingState } from './LoadingState'
import { ErrorState } from './ErrorState'
import { SuccessState } from './SuccessState'

export function OnboardingPage() {
  const token = useSearchParams().get('token')
  const router = useRouter()
  const { status, email, message } = useAcceptInvitation(token)

  if (status === 'loading') return <LoadingState />
  if (status === 'error') return <ErrorState message={message} />

  return (
    <SuccessState email={email} onContinue={() => router.push('/onboarding')} />
  )
}
