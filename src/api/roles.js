import request from '@/utils/request'

// 获取所有角色列表
export const getRolesList = (params) => {
  return request({
    url: '/sys/role',
    params,
  })
}

// 添加角色
export const addRole = (data) => {
  return request({
    method: 'POST',
    url: '/sys/role',
    data,
  })
}

export const getRolesInfo = (id) => {
  return request({
    url: '/sys/role/' + id,
  })
}

// 给角色分配权限
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data,
  })
}
