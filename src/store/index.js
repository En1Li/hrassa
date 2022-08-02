import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import persistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
  },
  getters,
  plugins: [
    persistedState({
      reducer(state) {
        return {
          // return 出来的就是要存到localstorage里面的
          user: {
            token: state.user.token,
          },
        }
      },
    }),
  ],
})

export default store
