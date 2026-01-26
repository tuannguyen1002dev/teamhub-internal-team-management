import Api from '@/shared/utils/api'
import { phoneRegionResponse } from './types'

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