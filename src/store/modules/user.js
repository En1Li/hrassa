import { login, getUserInfoApi, getUserDatail } from '@/api/user'
import { setTokenTime } from '@/utils/auth'
import { resetRouter } from '@/router'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {},
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setuserInfo(state, payload) {
      state.userInfo = payload
    },
  },
  actions: {
    async getToken(context, payload) {
      const res = await login(payload)
      context.commit('setToken', res)
      setTokenTime()
    },
    async getuserInfo(context, payload) {
      const res = await getUserInfoApi()
      console.log(res.userId)
      const datail = await getUserDatail(res.userId)
      context.commit('setuserInfo', { ...res, ...datail })
      return res
    },

    // 退出
    logout(context) {
      context.commit('setToken', '')
      context.commit('setuserInfo', {})
      resetRouter()
      context.commit('permission/setRouter', [], { root: true })
    },
  },
}
