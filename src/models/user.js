import { getMe, getUsers } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch({ params }, { call, put }) {
      const response = yield call(getUsers, params);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(getMe);
      yield put({
        type: 'saveCurrentUser',
        payload: { id: response.data.id, ...response.data.attributes },
      });
    },
    *delete({ payload, callback }, { put }) {
      // const response = yield call(deleteUser, id);
      yield put({
        type: 'deleteUsers',
        payload: payload.keys || [],
      });
      if (typeof callback === 'function') callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload.data,
        pagination: action.payload.meta.pagination || {},
      };
    },
    deleteUsers(state, action) {
      return {
        ...state,
        list: state.list.filter(item => !action.payload.includes(item.id)),
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
  },
};
