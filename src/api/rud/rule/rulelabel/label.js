import request from '@/utils/request'

// 查询疾病（诊断）标签列表
export function listLabel(query) {
  return request({
    url: '/lkai-rud/label/list',
    method: 'get',
    params: query
  })
}

// 查询疾病（诊断）标签详细
export function getLabel(id) {
  return request({
    url: '/lkai-rud/label/' + id,
    method: 'get'
  })
}

// 新增疾病（诊断）标签
export function addLabel(data) {
  return request({
    url: '/lkai-rud/label',
    method: 'post',
    data: data
  })
}

// 修改疾病（诊断）标签
export function updateLabel(data) {
  return request({
    url: '/lkai-rud/label',
    method: 'put',
    data: data
  })
}

// 删除疾病（诊断）标签
export function delLabel(id) {
  return request({
    url: '/lkai-rud/label/' + id,
    method: 'delete'
  })
}
