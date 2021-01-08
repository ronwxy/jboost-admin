import request from '@/utils/request'

export function add(data) {
    return request({
        url: 'user',
        method: 'post',
        data
    })
}


export function getUserList(id) {
    return request({
        url: 'user/' + id,
        method: 'get',
    })
}


export function del(id) {
    return request({
        url: 'user/' + id,
        method: 'delete'
    })
}

export function edit(data) {
    return request({
        url: 'user',
        method: 'put',
        data
    })
}

export function resetPass(user) {
    const data = {
        id: user.id,
        password: user.password
    };
    return request({
        url: 'user/reset-pass',
        method: 'post',
        data
    })
}


export function updateEmail(code, data) {
    return request({
        url: 'user/updateEmail/' + code,
        method: 'post',
        data
    })
}


