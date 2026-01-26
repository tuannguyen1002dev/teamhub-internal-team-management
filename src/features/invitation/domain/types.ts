import { InvitationTableProps } from '../contracts/invitation-table.contract'
import { InvitationFormInputProps } from '../contracts/invitation-formInput.contract'

export type InvitationContextValue = {
  invitationList: InvitationTableProps[]
  loading: boolean
  createInvitation: (email: string) => Promise<void>
  refresh: () => Promise<void>
}