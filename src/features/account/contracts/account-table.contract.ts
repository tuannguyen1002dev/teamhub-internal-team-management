import { statusEnum, accountRole } from "@/shared/types/account"
export interface AccountTableProps {
  id: string
  email: string
  username: string
  status: statusEnum
  role: accountRole
  createdAt: string
  createdBy: string
}