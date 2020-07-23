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

export function getMenuTree() {
  return request({
    url: "/role/getMenuTree",
    method: "get"
  })
}

export function add(data) {
  return request({
    url:"/role/",
    method:"post",
    data
  })
}
