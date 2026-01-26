export interface LoginPayload {
  email: string;
  password: string;
}

export const formDefaultValues: LoginPayload = {
  email: '',
  password: ''
}

export interface LoginResponse {
  token: string;
  account: {
    id: string;
    email: string;
    name: string;
  };
}