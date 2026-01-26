import Api from "@/shared/utils/api";

export const AuthKey = {
  accessToken: 'accessToken',
  refresh_accessToken: 'refresh_accessToken',
  userAccount: 'userAccount',
  verifyAccount: 'verifyAccount',
}

export const AuthService = {
  //! Auth Endpoint
  authMe() {
    return Api.get('/api/auth/me')
  },

  logout() {
    return Api.post('/api/auth/logout')
  },

  logMeIn(params: any) {
    return Api.post('/api/auth/login', params)
  }
}
