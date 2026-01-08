import { useEffect, useState } from 'react'
import { AccountAPI } from '../service'

export function useAccount() {
  const [accountList, setAccountList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function fetchAccounts() {
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
    await fetchAccounts()
  }

  useEffect(() => {
    fetchAccounts()
  }, [])

  return {
    accountList,
    loading,
    createAccount,
    fetchAccounts,
  }
}
