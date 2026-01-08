import Api from '@/shared/utils/api'

export const AccountAPI = {
  list: () => Api.get('/api/account'),
  create: (data: any) => Api.post('/api/account', data),
  update: (id: string, data: any) => Api.put(`/api/account/${id}`, data),
  delete: (id: string) => Api.delete(`/api/account/${id}`),
}
