import request from '@/utils/request'

export function upload_img(data) {
  return request({
    url: "/profile/upload_img",
    method: "post",
    data
  })
}

export function setAvatar(data) {
  return request({
    url: "/profile/setAvatar",
    method: "post",
    data
  })
}

export function getInfo() {
  return request({
    url: '/profile/info',
    method: 'get',
  })
}


export function getUserMenu() {
  return request({
    url: '/profile/menu',
    method: 'get'
  })
}


export function updateUsername(params) {
  return request({
    url: "/profile/setUsername",
    method: "put",
    params
  })
}
