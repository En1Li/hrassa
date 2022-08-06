import request from '@/utils/request'
export const getDeptsApi = () => {
  return request({
    url: '/company/department',
  })
}

export const delDeptsApi=(id)=>{
    return request({
        url:'/company/department/' + id,
        method: 'DELETE',
    })
}

// 新增部门
export const addDevalopment = (data)=>{
  return request({
    method: 'POST',
    url:'/company/department',
    data
  })
}