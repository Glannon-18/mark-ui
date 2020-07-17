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
