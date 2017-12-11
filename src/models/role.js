import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import { create, remove, update, updateValidstatus } from 'services/role'
import * as rolesService from 'services/roles'
import { pageModel } from './common'

const { query } = rolesService
const { prefix } = config

export default modelExtend(pageModel,{
  namespace:'role',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}roleIsMotion`) === 'true',
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if(location.pathname === '/role') {
          const payload = location.query;
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    }
  },

  effects: {

    * query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      if(data.success === 1 && data.data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.total,
            },
          }
        })
      }
    },

    * create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success === 1) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * update ({ payload }, { call, put }) {
      const data = yield call(update, payload)
      if (data.success === 1) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * validstatus ({ payload }, { call, put }) {
      const data = yield call(updateValidstatus, payload)
      if (data.success === 1) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      }else{
        throw data;
      }
    }
  },

  reducers: {
    showModal(state, {payload}){
      return { ...state, ...payload, modalVisible:true }
    },

    hideModal(state){
      return { ...state, modalVisible:false }
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}roleIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },
  },

})
