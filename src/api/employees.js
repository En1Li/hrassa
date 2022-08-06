import request from '@/utils/request'
export const getemployeesList = () => {
  return request({
    url: '/sys/user/simple',
  })
}
