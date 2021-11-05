import request from '@/utils/request'

// 查询标准给药途径目录列表
export function listRoutecatalog(query) {
  return request({
    url: '/lkai-rud/routecatalog/list',
    method: 'get',
    params: query
  })
}

// 查询标准给药途径目录详细
export function getRoutecatalog(id) {
  return request({
    url: '/lkai-rud/routecatalog/' + id,
    method: 'get'
  })
}

// 新增标准给药途径目录
export function addRoutecatalog(data) {
  return request({
    url: '/lkai-rud/routecatalog',
    method: 'post',
    data: data
  })
}

// 修改标准给药途径目录
export function updateRoutecatalog(data) {
  return request({
    url: '/lkai-rud/routecatalog',
    method: 'put',
    data: data
  })
}

// 删除标准给药途径目录
export function delRoutecatalog(id) {
  return request({
    url: '/lkai-rud/routecatalog/' + id,
    method: 'delete'
  })
}
