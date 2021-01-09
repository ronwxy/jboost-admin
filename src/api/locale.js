import request from '@/utils/request'

export function add(data) {
    return request({
        url: 'locale',
        method: 'post',
        data
    })
}

export function del(id) {
    return request({
        url: 'locale/' + id,
        method: 'delete'
    })
}

export function edit(data) {
    return request({
        url: 'locale',
        method: 'put',
        data
    })
}

export function batchDel(ids) {
    return request({
        url: `locale/batch`,
        method: 'delete',
        params: {ids: ids.join(',')}
    })
}

export function get(code) {
    return request({
        url: `locale`,
        method: 'get',
        params: {size:999,code:code}
    })
}

export function initLocale() {
    return request({
        url: `init-locale`,
        method: 'get',
        params: {size:999}
    })
}