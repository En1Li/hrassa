import router from '@/router'
import store from '@/store'
// 路由前置守卫
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  //   判断是否登录
  if (token) {
    if (!store.state.user.userInfo.userId) {
      store.dispatch('user/getuserInfo')
    }
    if (to.path === '/login') {
      //如果登录了 不能进入登录页
      next('/')
    } else {
      next() //可以进入其他页面
    }
  } else {
    //没有登录
    const isCludes = whiteList.includes(to.path) // 判断进入的页面是否在白名单内
    if (isCludes) {
      next() //在白名单内 直接进去
    } else {
      next('/login') //不在白名单内 直接跳转到登录页面
    }
  }
})
