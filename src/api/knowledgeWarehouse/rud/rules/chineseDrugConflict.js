import request from '@/utils/request'

// 查询中药18反19畏规则列表
export function listDrugConflict(query) {
  return request({
    url: '/lkai-rud/drugConflict/list',
    method: 'get',
    params: query
  })
}

// 查询中药18反19畏规则详细
export function getDrugConflict(id) {
  return request({
    url: '/lkai-rud/drugConflict/' + id,
    method: 'get'
  })
}

// 新增中药18反19畏规则
export function addDrugConflict(data) {
  return request({
    url: '/lkai-rud/drugConflict',
    method: 'post',
    data: data
  })
}

// 修改中药18反19畏规则
export function updateDrugConflict(data) {
  return request({
    url: '/lkai-rud/drugConflict',
    method: 'put',
    data: data
  })
}

// 删除中药18反19畏规则
export function delDrugConflict(id) {
  return request({
    url: '/lkai-rud/drugConflict/' + id,
    method: 'delete'
  })
}
