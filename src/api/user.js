import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/doLogin',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/system/logout',
    method: 'get'
  })
}


export function checkAccount(params) {
  return request({
    url: "/system/user/check",
    method: "get",
    params
  })
}

export function add(data) {
  return request({
    url: "/system/user/",
    method: "post",
    data
  })
}

export function update(id, data) {
  return request({
    url: "/system/user/" + id,
    method: "put",
    data
  })

}

export function page(params) {
  return request({
    url: "/system/user/",
    method: "get",
    params
  })
}

export function getByUserId(userId) {
  return request({
    url: "/system/user/" + userId,
    method: "get",
  })
}
