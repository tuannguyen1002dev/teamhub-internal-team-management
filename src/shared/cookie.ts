import Cookies from 'universal-cookie';
import { addMonths } from 'date-fns';
import { getCurrentDomain } from "./common";
export const CookieKey = {
  accessToken: 'accessToken',
  refresh_accessRToken: 'refresh_accessRToken',
  account: 'account',
};
const cookies = new Cookies();
export const CookiesStorage = {
  getCookieData(key: string) {
    return cookies.get(key);
  },
  setAccessToken(accessToken: string) {
    const domain = getCurrentDomain();
    const currentTime = new Date();
    const expires = addMonths(currentTime, 1);
    cookies.set(CookieKey.accessToken, accessToken, {
      domain,
      path: '/',
      expires,
    });
  },

  setRefreshAccessToken(refresh_accessRToken: string) {
    const domain = getCurrentDomain();
    const currentTime = new Date();
    const expires = addMonths(currentTime, 1);
    cookies.set(CookieKey.refresh_accessRToken, refresh_accessRToken, {
      domain,
      path: '/',
      expires,
    });
  },

  setAccount(data: {}) {
    const domain = getCurrentDomain();
    const currentTime = new Date();
    const expires = addMonths(currentTime, 1);
    cookies.set(CookieKey.account, data, {
      domain,
      path: '/',
      expires,
    });
  },
  setCookieData(key: string, data: string) {
    const domain = getCurrentDomain();
    const currentTime = new Date();
    const expires = addMonths(currentTime, 1);
    cookies.set(key, data, { domain, expires, path: '/' });
  },
  getAccessToken() {
    return cookies.get(CookieKey.accessToken);
  },
  getRefreshAccessToken() {
    return cookies.get(CookieKey.refresh_accessRToken);
  },
  getAccount() {
    return cookies.get(CookieKey.account);
  },
  clearAccount() {
    const domain = getCurrentDomain();
    cookies.remove(CookieKey.account, { domain, path: '/' });
  },
  clearAccessToken() {
    const domain = getCurrentDomain();
    cookies.remove(CookieKey.accessToken, { domain, path: '/' });
  },
  clearRefreshAccessToken() {
    const domain = getCurrentDomain();
    cookies.remove(CookieKey.refresh_accessRToken, { domain, path: '/' });
  },
  clearCounter() {
    const domain = getCurrentDomain();
    cookies.remove(CookieKey.accessToken, { domain, path: '/' });
  },
  clearCookieData(key: string) {
    const domain = getCurrentDomain();
    cookies.remove(key, { domain, path: '/' });
  },
};
