import request from '@/utils/request'

/**
 * /login
 * @param username
 * @param password
 * @param code
 * @param uuid
 * @param phone
 * @param userType
 * @param loginType
 * @returns {AxiosPromise}
 */
export function login(username, password, code, uuid,phone,userType,loginType) {
    return request({
        url: '/auth/login',
        method: 'post',
        data: {
            username,
            password,
            code,
            uuid,
            userType,
            phone,
            loginType
        }
    })
}

export function getInfo() {
    return request({
        url: '/user/jwtUser',
        method: 'get'
    })
}

export function getCodeImg() {
    return request({
        url: 'auth/captcha',
        method: 'get'
    })
}

export function getIdentify(phone, captcha, uuid) {
    return request({
        url: 'auth/code',
        method: 'post',
        data: {
            phone,
            captcha,
            uuid
        }
    })
}