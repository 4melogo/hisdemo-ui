import request from '@/utils/request'

// 查询妊娠用药禁忌列表
export function listRulePregnancy(query) {
  return request({
    url: '/lkai-rud/rulePregnancy/list',
    method: 'get',
    params: query
  })
}

// 查询妊娠用药禁忌详细
export function getRulePregnancy(id) {
  return request({
    url: '/lkai-rud/rulePregnancy/' + id,
    method: 'get'
  })
}

// 新增妊娠用药禁忌
export function addRulePregnancy(data) {
  return request({
    url: '/lkai-rud/rulePregnancy',
    method: 'post',
    data: data
  })
}

// 修改妊娠用药禁忌
export function updateRulePregnancy(data) {
  return request({
    url: '/lkai-rud/rulePregnancy',
    method: 'put',
    data: data
  })
}

// 删除妊娠用药禁忌
export function delRulePregnancy(id) {
  return request({
    url: '/lkai-rud/rulePregnancy/' + id,
    method: 'delete'
  })
}
