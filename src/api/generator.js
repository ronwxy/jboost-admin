import request from '@/utils/request'

export function generator(data, tableName) {
  return request({
    url: 'admin/generator?tableName=' + tableName,
    data,
    method: 'post'
  })
}
