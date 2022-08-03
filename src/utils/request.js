// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTokenTime } from '@/utils/auth'
import router from '@/router'

const isTimeout = () => {
  const currentTime = Date.now()
  const tokenTime = getTokenTime()
  const timeout = 2 * 60 * 60 * 1000
  // const timeout = 3 * 1000
  return currentTime - tokenTime > timeout
}
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
}) // 创建一个axios的实例
service.interceptors.request.use(async (config) => {
  if (store.state.user.token) {
    // const currentTime = Date.now()
    // const tokenTime = getTokenTime()
    // const timeout = 2 * 60 * 60 * 1000
    // const timeout = 3 * 1000
    if (isTimeout()) {
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录过期'))
    } else {
      config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
  }
  return config
}) // 请求拦截器

service.interceptors.response.use(
  // 请求成功后的操作
  (res) => {
    const { success, data, message } = res.data
    // 后端返回的状态码都是200，根据success判断是否成功
    if (success) {
      return data
    }
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  // 请求失败后的操作
  async function (error) {
    // 对响应错误做点什么
    if (error?.response?.status === 401) {
      Message.error('登录过期')
      await store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message)
    }

    return Promise.reject(error)
  },
) // 响应拦截器
export default service // 导出axios实例
