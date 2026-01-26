export const setupAccountDefualtValues = {
  email: '',
  username: '',
  fullname: '',
  phone: '',
  address: '',
  password: '',
  confirmPassword: '',
}

export interface phoneRegionResponse {
  country: string
  iso2: string
  dialCode: string
  flag?: string
}