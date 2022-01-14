import request from '@/utils/request'

// 查询中药用量规则列表
export function listDosage(query) {
  return request({
    url: '/lkai-rud/dosage/list',
    method: 'get',
    params: query
  })
}

// 查询中药用量规则详细
export function getDosage(id) {
  return request({
    url: '/lkai-rud/dosage/' + id,
    method: 'get'
  })
}

// 新增中药用量规则
export function addDosage(data) {
  return request({
    url: '/lkai-rud/dosage',
    method: 'post',
    data: data
  })
}

// 修改中药用量规则
export function updateDosage(data) {
  return request({
    url: '/lkai-rud/dosage',
    method: 'put',
    data: data
  })
}

// 删除中药用量规则
export function delDosage(id) {
  return request({
    url: '/lkai-rud/dosage/' + id,
    method: 'delete'
  })
}
