import request from '@/utils/request'
export const getemployeesList = () => {
  return request({
    url: '/sys/user/simple',
  })
}

// 获取员工列表
export const getemployeesInfo = (params)=>{
  return request({
    url:'/sys/user',
    params
  })
}