import request from '@/utils/request'

export function getDepts(params) {
  return request({
    url: 'dept',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'dept',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'dept/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'dept',
    method: 'put',
    data
  })
}

export function dept(id) {
  return request({
    // 下面的api不要改admin
    url: 'dept' + (id ? '/' + id : ''),
    method: 'get',
  })
}
