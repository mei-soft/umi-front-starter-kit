import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { userLogin, getFakeCaptcha } from '@/services/api';
import { getMe } from '@/services/user';
import { setAuthority, getCurrentUser } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import defaultSettings from '../defaultSettings';

const { requireLogin } = defaultSettings;

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(userLogin, payload);
      yield put({
        type: 'setToken',
        payload: response,
      });
      // Login successfully
      if (response.access_token) {
        const userResponse = yield call(getMe, payload);
        yield put({
          type: 'changeLoginStatus',
          payload: userResponse.data.attributes,
        });
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            redirect = null;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      // redirect
      if (window.location.pathname !== '/user/login' && requireLogin) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
  },

  reducers: {
    setToken(state, { payload }) {
      const auth = { token: payload.access_token };
      setAuthority(auth);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
    changeLoginStatus(state, { payload }) {
      const auth = getCurrentUser();
      setAuthority({ ...auth, user: payload });
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
