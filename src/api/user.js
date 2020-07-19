import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/doLogin',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

export function getUserMenu() {
  return request({
    url: '/user/menu',
    method: 'get'
  })
}

export function checkAccount(params) {
  return request({
    url: "/user/check",
    method: "get",
    params
  })
}

export function add(data) {
  return request({
    url: "/user/",
    method: "post",
    data
  })
}

export function update(id, data) {
  return request({
    url: "/user/" + id,
    method: "put",
    data
  })

}

export function page(params) {
  return request({
    url: "/user/",
    method: "get",
    params
  })
}

export function getByUserId(userId) {
  return request({
    url: "/user/" + userId,
    method: "get",
  })
}
