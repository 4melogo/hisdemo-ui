import request from '@/utils/request'

// 查询标准化医院药品列表
export function listCheckCodeDetail(query) {
  return request({
    url: '/datamatching/checkcodeDetail/list',
    method: 'get',
    params: query
  })
}

// 查询标准化医院药品详细
export function getCheckCodeDetail(id) {
  return request({
    url: '/datamatching/checkcodeDetail/' + id,
    method: 'get'
  })
}

// 新增标准化医院药品
export function addCheckCodeDetail(data) {
  return request({
    url: '/datamatching/checkcodeDetail',
    method: 'post',
    data: data
  })
}

// 修改标准化医院药品
export function updateCheckCodeDetail(data) {
  return request({
    url: '/datamatching/checkcodeDetail',
    method: 'put',
    data: data
  })
}

// 删除标准化医院药品
export function delCheckCodeDetail(id) {
  return request({
    url: '/datamatching/datamatching/' + id,
    method: 'delete'
  })
}
