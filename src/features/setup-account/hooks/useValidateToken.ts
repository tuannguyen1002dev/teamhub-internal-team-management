import { useEffect, useState } from 'react'
import { verifyInvitation, phoneRegion } from "../service"

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
      console.log('Invitation verified data:', data)
      setEmail(data.emailBasedToken)
      setMessage(data.message ?? 'Invitation verified successfully.')
      setStatus('success')

    }).catch((err) => {
      setStatus('error')
      setMessage(err?.response?.data?.error ?? 'Something went wrong.')
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