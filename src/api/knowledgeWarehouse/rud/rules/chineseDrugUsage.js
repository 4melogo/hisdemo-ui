import request from '@/utils/request'

// 查询中药用法规则列表
export function listChineseDrugUsage(query) {
  return request({
    url: '/lkai-rud/chineseDrugUsage/list',
    method: 'get',
    params: query
  })
}

// 查询中药用法规则详细
export function getChineseDrugUsage(id) {
  return request({
    url: '/lkai-rud/chineseDrugUsage/' + id,
    method: 'get'
  })
}

// 新增中药用法规则
export function addChineseDrugUsage(data) {
  return request({
    url: '/lkai-rud/chineseDrugUsage',
    method: 'post',
    data: data
  })
}

// 修改中药用法规则
export function updateChineseDrugUsage(data) {
  return request({
    url: '/lkai-rud/chineseDrugUsage',
    method: 'put',
    data: data
  })
}

// 删除中药用法规则
export function delChineseDrugUsage(id) {
  return request({
    url: '/lkai-rud/chineseDrugUsage/' + id,
    method: 'delete'
  })
}
