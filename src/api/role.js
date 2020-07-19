import request from '@/utils/request'

export function getAllRole() {
  return request({
    url: '/role/selectAll',
    method: 'get',
    data:{a:1}
  })
}
