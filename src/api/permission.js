import request from '@/utils/request'

// 获取所有的权限树
export function getPermissionTree() {
  return request({
    url: 'admin/permissions/tree',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'admin/permissions',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'admin/permissions/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'admin/permissions',
    method: 'put',
    data
  })
}
