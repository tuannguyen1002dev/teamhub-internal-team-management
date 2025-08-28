import Api from "@/shared/utils/api";
import { CookiesStorage } from "@/shared/utils/cookie";
import authConfig from '@/config/auth'

export const AuthKey = {
  accessToken: 'accessToken',
  refresh_accessToken: 'refresh_accessToken',
  userAccount: 'userAccount',
  verifyAccount: 'verifyAccount',
}

export const AuthService = {

  // * AccessToken
  setAccessToken(accessToken: string) {
    CookiesStorage.SetKey(AuthKey.accessToken, accessToken)
  },
  getAccessToken() {
    return CookiesStorage.GetKey(AuthKey.accessToken)
  },
  clearAccessToken() {
    CookiesStorage.ClearKey(AuthKey.accessToken)
  },


  // * refresh AccessToken
  setRefAccessToken(accessToken: string) {
    return CookiesStorage.SetKey(AuthKey.refresh_accessToken, accessToken)
  },
  getRefAccessToken() {
    return CookiesStorage.GetKey(AuthKey.refresh_accessToken)
  },
  clearRefAccessToken() {
    return CookiesStorage.ClearKey(AuthKey.refresh_accessToken)
  },

  // * User Account
  setUserAccount(userData: any) {
    return localStorage.setItem(AuthKey.userAccount, JSON.stringify(userData))
  },
  getUserAccount() {
    return localStorage.getItem(AuthKey.userAccount)
  },
  clearUserAccount() {
    return localStorage.removeItem(AuthKey.userAccount)
  },

  //! Auth Endpoint
  authMe(storedToken: string) {
    return Api.get(authConfig.authMeEndPoint, { headers: { Authorization: storedToken } })
  },
  reAuthMe(storedToken: string) {
    return Api.post(authConfig.reAuthMeEndpoint, { accessToken: this.getAccessToken(), refreshToken: this.getRefAccessToken() }, { headers: { Authorization: storedToken } })
  },

  // TODO: Login
  logMeIn(params: {}) {
    return Api.post(authConfig.loginEndpoint,params, false)
  }

}
