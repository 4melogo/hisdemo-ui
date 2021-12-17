import request from '@/utils/request'

// 查询用法用量列表
export function listRuleusage(query) {
  return request({
    url: '/lkai-rud/ruleusage/list',
    method: 'get',
    params: query
  })
}

// 查询用法用量详细
export function getRuleusage(id) {
  return request({
    url: '/lkai-rud/ruleusage/' + id,
    method: 'get'
  })
}

// 新增用法用量
export function addRuleusage(data) {
  return request({
    url: '/lkai-rud/ruleusage',
    method: 'post',
    data: data
  })
}

// 修改用法用量
export function updateRuleusage(data) {
  return request({
    url: '/lkai-rud/ruleusage',
    method: 'put',
    data: data
  })
}

// 删除用法用量
export function delRuleusage(id) {
  return request({
    url: '/lkai-rud/ruleusage/' + id,
    method: 'delete'
  })
}
