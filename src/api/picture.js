import request from '@/utils/request'

export function del(id) {
  return request({
    url: 'admin/pictures/' + id,
    method: 'delete'
  })
}

export function delAll(ids) {
  return request({
    url: 'admin/pictures/',
    method: 'delete',
    data: ids
  })
}
