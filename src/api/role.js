import request from '@/utils/request'

export function getAllRole() {
  return request({
    url: '/role/selectAll',
    method: 'get',
  })
}

export function page(params) {
  return request({
    url: "/role/",
    method: "get",
    params
  })
}
