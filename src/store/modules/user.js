import { login, getUserInfoApi, getUserDatail } from '@/api/user'
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
    },
    async getuserInfo(context, payload) {
      const res = await getUserInfoApi()
      const datail = await getUserDatail(res.userId)
      context.commit('setuserInfo', { ...res, ...datail })
    },
  },
}
