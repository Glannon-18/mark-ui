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
