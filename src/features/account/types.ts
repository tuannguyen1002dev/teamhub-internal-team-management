export interface AccountFormInput {
  email: string,
}

export const formDefaultValues: AccountFormInput = {
  email: '',
}

export interface Account {
  id: string
  email: string
  fullname: string
  username: string
  status: statusEnum
  role: accountRole
  permissions: accountPermission[]
  createdAt: string
}

type statusEnum = "ACTIVE" | "SUSPENDED"
type genderEnum = "MALE" | "FEMALE" | "OTHERS"
type accountRole = "ADMIN" | "USER"
type accountPermission = "READ" | "WRITE" | "UPDATE" | "DELETE" | "MANAGE"

export interface AccountContextValue {
  accountList: Account[];
  loading: boolean;
  createAccount: (email: string) => Promise<void>;
  fetchAccountList: () => Promise<void>;
}

