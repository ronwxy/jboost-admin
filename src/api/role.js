import request from '@/utils/request'

// 获取所有的Role
export function getAll() {
  return request({
    url: 'role',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'role',
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: 'role/' + id,
    method: 'get'
  })
}


export function del(id) {
  return request({
    url: 'role/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'role',
    method: 'put',
    data
  })
}


export function editMenu(data) {
  return request({
    url: '/role-resource',
    method: 'post',
    data
  })
}

// 获取所有的Role
export function getRoles() {
    return request({
        url: 'role',
        method: 'get',
        params: {current:1,size:999}
    })
}