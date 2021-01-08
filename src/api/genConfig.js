import request from '@/utils/request'

export function get() {
  return request({
    url: 'admin/genConfig',
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: 'admin/genConfig',
    data,
    method: 'put'
  })
}