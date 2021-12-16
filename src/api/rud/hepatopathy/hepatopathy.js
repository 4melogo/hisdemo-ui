import request from '@/utils/request'

// 查询肝损用药禁忌列表
export function listHepatopathy(query) {
  return request({
    url: '/lkai-rud/hepatopathy/list',
    method: 'get',
    params: query
  })
}

// 查询肝损用药禁忌详细
export function getHepatopathy(id) {
  return request({
    url: '/lkai-rud/hepatopathy/' + id,
    method: 'get'
  })
}

// 新增肝损用药禁忌
export function addHepatopathy(data) {
  return request({
    url: '/lkai-rud/hepatopathy/add',
    method: 'post',
    data: data
  })
}

// 修改肝损用药禁忌
export function updateHepatopathy(data) {
  return request({
    url: '/lkai-rud/hepatopathy/edit',
    method: 'put',
    data: data
  })
}

// 删除肝损用药禁忌
export function delHepatopathy(id) {
  return request({
    url: '/lkai-rud/hepatopathy/' + id,
    method: 'delete'
  })
}
