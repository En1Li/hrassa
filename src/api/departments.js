import request from '@/utils/request'
export const getDeptsApi = () => {
  return request({
    url: '/company/department',
  })
}

export const delDeptsApi = (id) => {
  return request({
    url: '/company/department/' + id,
    method: 'DELETE',
  })
}

// 新增部门
export const addDevalopment = (data) => {
  return request({
    method: 'POST',
    url: '/company/department',
    data,
  })
}

// 根据ID查询部门详情
export const getDeptById = (id) => {
  return request({
    url: '/company/department/' + id,
  })
}

// 根据ID修改部门详情
export const editDeptById = (data)=>{
  return request({
    url: '/company/department/'+data.id,
    method: 'PUT',
    data
  })
}