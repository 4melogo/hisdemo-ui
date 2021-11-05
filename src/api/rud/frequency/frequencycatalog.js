import request from '@/utils/request'

// 查询标准频次目录列表
export function listFrequencycatalog(query) {
  return request({
    url: '/lkai-rud/frequencycatalog/list',
    method: 'get',
    params: query
  })
}

// 查询标准频次目录详细
export function getFrequencycatalog(id) {
  return request({
    url: '/lkai-rud/frequencycatalog/' + id,
    method: 'get'
  })
}

// 新增标准频次目录
export function addFrequencycatalog(data) {
  return request({
    url: '/lkai-rud/frequencycatalog',
    method: 'post',
    data: data
  })
}

// 修改标准频次目录
export function updateFrequencycatalog(data) {
  return request({
    url: '/lkai-rud/frequencycatalog',
    method: 'put',
    data: data
  })
}

// 删除标准频次目录
export function delFrequencycatalog(id) {
  return request({
    url: '/lkai-rud/frequencycatalog/' + id,
    method: 'delete'
  })
}
