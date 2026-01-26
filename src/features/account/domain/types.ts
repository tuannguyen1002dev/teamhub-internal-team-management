import { AccountTableProps } from '../contracts/account-table.contract'

export interface AccountFormInput {
  email: string,
}

export const formDefaultValues: AccountFormInput = {
  email: '',
}

export interface AccountContextValue {
  accountList: AccountTableProps[];
  loading: boolean;
  createAccount: (email: string) => Promise<void>;
  fetchAccountList: () => Promise<void>;
}

