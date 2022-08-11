import request from '@/utils/request'

// 获取所有角色列表
export const getRolesList = (params)=>{
    return request({
        url:'/sys/role',
        params
    })
}

// 添加角色
export const addRole = (data)=>{
    return request({
        method: 'POST',
        url:'/sys/role',
        data
    })
}