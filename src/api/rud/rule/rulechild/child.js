import request from '@/utils/request'

// 查询儿童用药规则列表
export function listChild(query) {
  return request({
    url: '/lkai-rud/child/list',
    method: 'get',
    params: query
  })
}

// 查询儿童用药规则详细
export function getChild(id) {
  return request({
    url: '/lkai-rud/child/' + id,
    method: 'get'
  })
}

// 新增儿童用药规则
export function addChild(data) {
  return request({
    url: '/lkai-rud/child',
    method: 'post',
    data: data
  })
}

// 修改儿童用药规则
export function updateChild(data) {
  return request({
    url: '/lkai-rud/child',
    method: 'put',
    data: data
  })
}

// 删除儿童用药规则
export function delChild(id) {
  return request({
    url: '/lkai-rud/child/' + id,
    method: 'delete'
  })
}
