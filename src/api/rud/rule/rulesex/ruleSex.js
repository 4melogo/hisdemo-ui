import request from '@/utils/request'

// 查询性别用药列表
export function listRuleSex(query) {
  return request({
    url: '/lkai-rud/ruleSex/list',
    method: 'get',
    params: query
  })
}

// 查询性别用药详细
export function getRuleSex(id) {
  return request({
    url: '/lkai-rud/ruleSex/' + id,
    method: 'get'
  })
}

// 新增性别用药
export function addRuleSex(data) {
  return request({
    url: '/lkai-rud/ruleSex',
    method: 'post',
    data: data
  })
}

// 修改性别用药
export function updateRuleSex(data) {
  return request({
    url: '/lkai-rud/ruleSex',
    method: 'put',
    data: data
  })
}

// 删除性别用药
export function delRuleSex(id) {
  return request({
    url: '/lkai-rud/ruleSex/' + id,
    method: 'delete'
  })
}
