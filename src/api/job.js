import request from '@/utils/request'

export function getAllJob(deptId) {
  const params = {
    deptId,
    page: 0,
    size: 9999
  }
  return request({
    url: '/job',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: '/job',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/job/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: '/job',
    method: 'put',
    data
  })
}
