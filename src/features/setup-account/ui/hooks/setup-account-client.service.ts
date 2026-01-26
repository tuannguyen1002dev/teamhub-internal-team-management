import Api from '@/shared/utils/api'
import { phoneRegionResponse } from '../../domain/types'

export async function verifyInvitation(token: string) {
  const res = await Api.get(`/api/accept-invitation?token=${encodeURIComponent(token)}`, {
    params: { token },
  })
  return res.data
}

export async function phoneRegion() {
  const res = await Api.get('/api/phone-region')
  return res.data
}

export async function createAccount(payload: any) {
  const res = await Api.post('/api/setup-account', payload)
  return res.data
}