import request from '@/utils/request'

// 查询西药相互作用列表
export function listInteraction(query) {
  return request({
    url: '/lkai-rud/interaction/list',
    method: 'get',
    params: query
  })
}

// 查询西药相互作用详细
export function getInteraction(id) {
  return request({
    url: '/lkai-rud/interaction/' + id,
    method: 'get'
  })
}

// 新增西药相互作用
export function addInteraction(data) {
  return request({
    url: '/lkai-rud/interaction',
    method: 'post',
    data: data
  })
}

// 修改西药相互作用
export function updateInteraction(data) {
  return request({
    url: '/lkai-rud/interaction',
    method: 'put',
    data: data
  })
}

// 删除西药相互作用
export function delInteraction(id) {
  return request({
    url: '/lkai-rud/interaction/' + id,
    method: 'delete'
  })
}

// 成分标签
export function getLabelList() {
  return request({
    url: '/lkai-rud/component/componentList/',
    method: 'get'
  })
}
