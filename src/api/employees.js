import request from '@/utils/request'
export const getemployeesList = () => {
  return request({
    url: '/sys/user/simple',
  })
}

// 获取员工列表
export const getemployeesInfo = (params) => {
  return request({
    url: '/sys/user',
    params,
  })
}

/**
 * 删除员工接口
 * ****/

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete',
  })
}

/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data,
  })
}


// 批量导入员工
export function importEmployees(data){
  return request({
    method: 'POST',
    url:'/sys/user/batch',
    data
  })
}