import request from '@/utils/request'

// 查询配伍禁忌数据列表
export function listCompatibility(query) {
  return request({
    url: '/lkai-rud/compatibility/list',
    method: 'get',
    params: query
  })
}

export function getComponents() {
  return request({
    url: '/lkai-rud/component/componentList',
    method: 'get'
  })
}

// 查询配伍禁忌数据详细
export function getCompatibility(id) {
  return request({
    url: '/lkai-rud/compatibility/' + id,
    method: 'get'
  })
}

// 新增配伍禁忌数据
export function addCompatibility(data) {
  return request({
    url: '/lkai-rud/compatibility',
    method: 'post',
    data: data
  })
}

// 修改配伍禁忌数据
export function updateCompatibility(data) {
  return request({
    url: '/lkai-rud/compatibility',
    method: 'put',
    data: data
  })
}

// 删除配伍禁忌数据
export function delCompatibility(id) {
  return request({
    url: '/lkai-rud/compatibility/' + id,
    method: 'delete'
  })
}
