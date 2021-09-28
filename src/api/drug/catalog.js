import request from '@/utils/request'

// 查询药品目录列表
export function listCatalog(query) {
  return request({
    url: '/drug/catalog/list',
    method: 'get',
    params: query
  })
}

// 查询药品目录详细
export function getCatalog(id) {
  return request({
    url: '/drug/catalog/' + id,
    method: 'get'
  })
}

// 新增药品目录
export function addCatalog(data) {
  return request({
    url: '/drug/catalog',
    method: 'post',
    data: data
  })
}

// 修改药品目录
export function updateCatalog(data) {
  return request({
    url: '/drug/catalog',
    method: 'put',
    data: data
  })
}

// 删除药品目录
export function delCatalog(id) {
  return request({
    url: '/drug/catalog/' + id,
    method: 'delete'
  })
}
