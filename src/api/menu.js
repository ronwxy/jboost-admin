import request from '@/utils/request'

// 获取所有的菜单树
export function getMenusTree() {
    return request({
        url: 'resource',
        method: 'get',
        params: {current: 1, size: 999, type: 'MENU'}
    })
}

export function buildMenus() {
    return request({
        url: 'resource/available',
        method: 'get'
    })
}

export function add(data) {
    return request({
        url: 'resource',
        method: 'post',
        data
    })
}

export function del(id) {
    return request({
        url: 'resource/' + id,
        method: 'delete'
    })
}

export function edit(data) {
    return request({
        url: 'resource',
        method: 'put',
        data
    })
}
