import request from '@/utils/request'

export function getAllRole() {
  return request({
    url: '/system/role/selectAll',
    method: 'get',
  })
}

export function page(params) {
  return request({
    url: "/system/role/",
    method: "get",
    params
  })
}

export function getMenuTree() {
  return request({
    url: "/system/role/getMenuTree",
    method: "get"
  })
}

export function add(data) {
  return request({
    url: "/system/role/",
    method: "post",
    data
  })
}

export function getRoleWithMenu(id) {
  return request({
    url: "/system/role/" + id,
    method: "get"
  })

}

export function deleteRole(id) {
  return request({
    url: "/system/role/" + id,
    method: "delete"
  })

}
