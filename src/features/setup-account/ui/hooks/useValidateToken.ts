import { useEffect, useState } from 'react'
import { verifyInvitation, phoneRegion } from "./setup-account-client.service"

type Status = 'loading' | 'success' | 'error'

export function useValidateToken(token: string | null) {
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
      if (data.status === 'ALREADY_ACCEPTED') {
        window.location.href = '/login'; // Hard redirect to clear state
        return;
      }
      setEmail(data.email)
      setStatus('success')
    }).catch((err) => {
      setStatus('error')
      // Requirement: Do not expose invitation validity via UI messages.
      // We show a generic "Not Found" or redirected to 404 by the router
      setMessage(err?.response?.status === 404 ? 'Invitation not found' : 'Something went wrong.')
    })
  }, [token])

  return { status, email, message }
}

export function usePhoneRegions() {
  const [regions, setRegions] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    phoneRegion().then((res) => {
      setRegions(res.regionsList)
      setLoading(false)
    }).catch((err) => {
      setError(err?.response?.data?.error ?? 'Failed to fetch phone regions.')
      setLoading(false)
    })
  }, [])

  return { regions, loading, error }
}