import router, { constantRoutes, asyncRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    routes: [], //路由权限
    points:[] //按钮权限 
  },
  mutations: {
    setRouter(state, routes) {
      state.routes = [...constantRoutes, ...routes]
    },
    setPoints(state, routes){
      state.points = routes
    }
  },
  actions: {
    filtreRouter(context, roles) {
      const routes = asyncRoutes.filter((item) => {
        return roles.menus.includes(item.meta.id)
      })
      context.commit('setRouter', routes)
      router.addRoutes([
        ...routes,
        { path: '*', redirect: '/404', hidden: true },
      ])
    },
    setPointsAction(context, roles){
      context.commit('setPoints' , roles)
    }
  },
}
