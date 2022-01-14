import request from '@/utils/request'

// 查询中药年龄规则列表
export function listChineseDrugAge(query) {
  return request({
    url: '/lkai-rud/chineseDrugAge/list',
    method: 'get',
    params: query
  })
}

// 查询中药年龄规则详细
export function getChineseDrugAge(id) {
  return request({
    url: '/lkai-rud/chineseDrugAge/' + id,
    method: 'get'
  })
}

// 新增中药年龄规则
export function addChineseDrugAge(data) {
  return request({
    url: '/lkai-rud/chineseDrugAge',
    method: 'post',
    data: data
  })
}

// 修改中药年龄规则
export function updateChineseDrugAge(data) {
  return request({
    url: '/lkai-rud/chineseDrugAge',
    method: 'put',
    data: data
  })
}

// 删除中药年龄规则
export function delChineseDrugAge(id) {
  return request({
    url: '/lkai-rud/chineseDrugAge/' + id,
    method: 'delete'
  })
}
