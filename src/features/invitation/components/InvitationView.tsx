import InvitationForm from "./InvitationForm";
import InvitationTable from "./InvitationTable";
import { InvitationProvider } from "../hooks/InvitationContext";

export function InvitationView() {
  return (
    <InvitationProvider>
      <div className="flex flex-col gap-10">
        <InvitationForm />
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold">Invitation list</p>
          <InvitationTable />
        </div>
      </div>
    </InvitationProvider>
  )
}