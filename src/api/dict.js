import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'admin/dict',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'admin/dict/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'admin/dict',
    method: 'put',
    data
  })
}
