import request from '@/utils/request'

export function login(data) {
  return request({
    method: 'POST',
    url: '/sys/login',
    data,
  })
}

export const getUserInfoApi = () => {
  return request({
    method: 'POST',
    url: '/sys/profile',
  })
}

export const getUserDatail = (id) => {
  return request({
    url: '/sys/user/' + id,
  })
}
/** *
 *
 * 保存员工的基本信息
 * **/
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data,
  })
}
