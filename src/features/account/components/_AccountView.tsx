import AccountTable from "./AccountTable";
import { AccountProvider } from "../hooks/accountContext";

export function AccountView() {
  return (
    <AccountProvider>
      <div className="flex flex-col gap-10">
        <p className="text-2xl font-bold">Account list</p>
        <AccountTable />
      </div>
    </AccountProvider>
  )
}