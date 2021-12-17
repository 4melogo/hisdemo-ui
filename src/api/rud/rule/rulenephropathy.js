import request from '@/utils/request'

// 查询肾损用药列表
export function listNephropathy(query) {
  return request({
    url: '/lkai-rud/nephropathy/list',
    method: 'get',
    params: query
  })
}

// 查询肾损用药详细
export function getNephropathy(id) {
  return request({
    url: '/lkai-rud/nephropathy/' + id,
    method: 'get'
  })
}

// 新增肾损用药
export function addNephropathy(data) {
  return request({
    url: '/lkai-rud/nephropathy',
    method: 'post',
    data: data
  })
}

// 修改肾损用药
export function updateNephropathy(data) {
  return request({
    url: '/lkai-rud/nephropathy',
    method: 'put',
    data: data
  })
}

// 删除肾损用药
export function delNephropathy(id) {
  return request({
    url: '/lkai-rud/nephropathy/' + id,
    method: 'delete'
  })
}
