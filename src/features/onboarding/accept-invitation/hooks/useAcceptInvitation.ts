// features/invitation-acceptance/hooks/useAcceptInvitation.ts
import { useEffect, useState } from 'react'
import { verifyInvitation } from "../service"

type Status = 'loading' | 'success' | 'error'

export function useAcceptInvitation(token: string | null) {
  const [status, setStatus] = useState<Status>('loading')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('Invalid invitation link.')
      return
    }
    verifyInvitation(token).then((data) => {
      setEmail(data.newBidingEmail)
      setMessage(data.message ?? 'Invitation verified successfully.')
      setStatus('success')
    }).catch((err) => {
      setStatus('error')
      setMessage(err?.response?.data?.error ?? 'Something went wrong.')
    })
  }, [token])

  return { status, email, message }
}
