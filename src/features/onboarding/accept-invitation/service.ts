import Api from '@/shared/utils/api'

export async function verifyInvitation(token: string) {
  const res = await Api.get(`/api/accept-invitation?token=${encodeURIComponent(token)}`, {
    params: { token },
  })
  return res.data
}

export async function onAcceptInvitation(token: string) {
  const res = await Api.get(`/api/accept-invitation?token=${encodeURIComponent(token)}/accept`, {
    params: { token },
  })
  return res.data
}