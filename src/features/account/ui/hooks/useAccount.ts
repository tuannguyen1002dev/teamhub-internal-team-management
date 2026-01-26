import { useEffect, useState } from 'react'
import { AccountAPI } from './account-client.service'

export function useAccount() {
  const [accountList, setAccountList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function fetchAccountList() {
    setLoading(true)
    try {
      const res = await AccountAPI.list()
      setAccountList(res.data)
    } finally {
      setLoading(false)
    }
  }

  async function createAccount(email: string) {
    await AccountAPI.create(email)
    await fetchAccountList()
  }

  useEffect(() => {
    fetchAccountList()
  }, [])

  return {
    accountList,
    loading,
    createAccount,
    fetchAccountList,
  }
}
