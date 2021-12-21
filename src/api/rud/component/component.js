import request from '@/utils/request'

// 查询成分内容列表
export function listComponent(query) {
  return request({
    url: '/lkai-rud/component/list',
    method: 'get',
    params: query
  })
}

// 查询成分内容详细
export function getComponent(id) {
  return request({
    url: '/lkai-rud/component/' + id,
    method: 'get'
  })
}

// 新增成分内容
export function addComponent(data) {
  return request({
    url: '/lkai-rud/component',
    method: 'post',
    data: data
  })
}

// 修改成分内容
export function updateComponent(data) {
  return request({
    url: '/lkai-rud/component',
    method: 'put',
    data: data
  })
}

// 删除成分内容
export function delComponent(id) {
  return request({
    url: '/lkai-rud/component/' + id,
    method: 'delete'
  })
}
