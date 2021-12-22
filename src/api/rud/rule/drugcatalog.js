import request from '@/utils/request'

// 查询药品目录列表
export function listDrugcatalog(query) {
  return request({
    url: '/lkai-rud/drugcatalog/list',
    method: 'get',
    params: query
  })
}

// 查询药品目录详细
export function getDrugcatalog(id) {
  return request({
    url: '/lkai-rud/drugcatalog/' + id,
    method: 'get'
  })
}

// 新增药品目录
export function addDrugcatalog(data) {
  return request({
    url: '/lkai-rud/drugcatalog',
    method: 'post',
    data: data
  })
}

// 修改药品目录
export function updateDrugcatalog(data) {
  return request({
    url: '/lkai-rud/drugcatalog',
    method: 'put',
    data: data
  })
}

// 删除药品目录
export function delDrugcatalog(id) {
  return request({
    url: '/lkai-rud/drugcatalog/' + id,
    method: 'delete'
  })
}
