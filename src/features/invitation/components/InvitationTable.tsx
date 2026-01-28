'use client'

import { Copy, Check } from "lucide-react";
import { useFeatureAlert } from "@/contexts/FeaturesAlertContext";
import clipboard from "@/shared/utils/clipboard";
import formatDateTime from '@/shared/utils/formatDateTime';
import { InvitationTableProps } from "@/shared/contracts/invitation/invitation-table.contract"
import { useInvitationContext } from "../hooks/InvitationContext";

export default function InvitationTable() {
  const { loading, invitationList } = useInvitationContext();
  const { showBanner } = useFeatureAlert();

  async function handleCopy(value: string) {
    const success = await clipboard(value)
    showBanner(
      success ? <Check /> : null,
      success ? 'Copied to clipboard' : 'Failed to copy',
      success ? 'success' : 'error'
    )
  }

  if (loading)
    return <div className="p-4 text-white/70">Loading invitations...</div>

  if (!invitationList.length)
    return <div className="p-4 text-white/50">No invitations found</div>

  return (
    <table className="min-w-full bg-black/30 rounded-xl overflow-y-auto">
      <thead>
        <tr className="text-start bg-black20 text-white text-sm">
          <th className="px-4 py-2 max-w-20 border-r border-white/10 text-center">Access token</th>
          <th className="px-4 py-2 max-w-30 border-r border-white/10 text-left">Email</th>
          <th className="px-4 max-w-10 py-2 text-center border-r border-white/10">Status</th>
          <th className="px-4 py-2 max-w-15 text-center border-r border-white/10">Invited by</th>
          <th className="px-4 py-2 max-w-15 text-center border-r border-white/10">Created at</th>
          <th className="px-4 py-2 min-w-10 flex justify-center align-middle text-center">Link</th>
        </tr>
      </thead>
      <tbody>
        {invitationList.map((item) => (
          <InvitationRow
            key={item.id}
            item={item}
            onCopy={handleCopy}
          />
        ))}
      </tbody>
    </table>
  )
}

function InvitationRow({
  item,
  onCopy,
}: {
  item: InvitationTableProps
  onCopy: (value: string) => void
}) {
  return (
    <tr className="text-sm border-t border-white/5">
      <td className="px-4 max-w-15 truncate transition-all duration-300 ease-in-out cursor-pointer border-r border-white/10" title={item.token} onClick={() => onCopy(item.token)} >
        {item.token}
      </td>
      <td className="px-4 py-2 border-r border-white/10">{item.email}</td>
      <td className="px-4 py-2 text-center border-r border-white/10">
        {item.status ? 'Inactive' : 'Available'}
      </td>
      <td className="px-4 py-2 text-center border-r border-white/10">{item.createBy}</td>
      <td className="px-4 py-2 text-center border-r border-white/10">
        {item.createdAt ? formatDateTime(item.createdAt) : '-'}
      </td>
      <td className="px-4 py-2 text-center cursor-pointer flex justify-center items-center" onClick={() => onCopy(item.invLink)} >
        <Copy size={16} strokeWidth={1} />
      </td>
    </tr>
  )
}
