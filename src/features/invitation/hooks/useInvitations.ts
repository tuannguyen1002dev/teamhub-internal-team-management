
// features/invitation/hooks/useInvitations.ts
import { useEffect, useState, useCallback } from 'react'
import { InvitationAPI } from '../service'
import { InvitationTableProps } from "@/shared/contracts/invitation/invitation-table.contract"

export function useInvitations() {
  const [invitationList, setInvitationList] = useState<InvitationTableProps[]>([])
  const [loading, setLoading] = useState(false)

  const fetchList = useCallback(async () => {
    setLoading(true)
    try {
      const res = await InvitationAPI.list()
      setInvitationList(res.data)
    } finally {
      setLoading(false)
    }
  }, [])

  const createInvitation = useCallback(async (email: string) => {
    await InvitationAPI.create(email)
    await fetchList()
  }, [fetchList])

  useEffect(() => {
    fetchList()
  }, [fetchList])

  return {
    invitationList,
    loading,
    createInvitation,
    refresh: fetchList,
  }
}
