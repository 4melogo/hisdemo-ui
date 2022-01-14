import request from '@/utils/request'

// 查询中药病生规则列表
export function listChineseDrugSickness(query) {
  return request({
    url: '/lkai-rud/chineseDrugSickness/list',
    method: 'get',
    params: query
  })
}

// 查询中药病生规则详细
export function getChineseDrugSickness(id) {
  return request({
    url: '/lkai-rud/chineseDrugSickness/' + id,
    method: 'get'
  })
}

// 新增中药病生规则
export function addChineseDrugSickness(data) {
  return request({
    url: '/lkai-rud/chineseDrugSickness',
    method: 'post',
    data: data
  })
}

// 修改中药病生规则
export function updateChineseDrugSickness(data) {
  return request({
    url: '/lkai-rud/chineseDrugSickness',
    method: 'put',
    data: data
  })
}

// 删除中药病生规则
export function delChineseDrugSickness(id) {
  return request({
    url: '/lkai-rud/chineseDrugSickness/' + id,
    method: 'delete'
  })
}
