import { InvitationTableProps } from "@/shared/contracts/invitation/invitation-table.contract"

export type InvitationContextValue = {
  invitationList: InvitationTableProps[]
  loading: boolean
  createInvitation: (email: string) => Promise<void>
  refresh: () => Promise<void>
}