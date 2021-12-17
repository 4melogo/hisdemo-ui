import request from '@/utils/request'

// 查询老年用药规则列表
export function listRuleElder(query) {
  return request({
    url: '/lkai-rud/ruleElder/list',
    method: 'get',
    params: query
  })
}

// 查询老年用药规则详细
export function getRuleElder(id) {
  return request({
    url: '/lkai-rud/ruleElder/' + id,
    method: 'get'
  })
}

// 新增老年用药规则
export function addRuleElder(data) {
  return request({
    url: '/lkai-rud/ruleElder',
    method: 'post',
    data: data
  })
}

// 修改老年用药规则
export function updateRuleElder(data) {
  return request({
    url: '/lkai-rud/ruleElder',
    method: 'put',
    data: data
  })
}

// 删除老年用药规则
export function delRuleElder(id) {
  return request({
    url: '/lkai-rud/ruleElder/' + id,
    method: 'delete'
  })
}
