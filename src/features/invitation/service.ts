import Api from '@/shared/utils/api'

export const InvitationAPI = {
  list: () => Api.get('/api/invitation'),
  create: (email: string) => Api.post('/api/invitation', { email }),
}
