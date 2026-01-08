export interface defualtValues {
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  account: {
    id: string;
    email: string;
    name: string;
  };
}