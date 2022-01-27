import request from '@/utils/request'

// 查询医院诊断标准化结果列表
export function listDiagnosis(query) {
  return request({
    url: '/lkai-datamatching/diagnosis/list',
    method: 'get',
    params: query
  })
}

// 查询医院诊断标准化结果详细
export function getDiagnosis(id) {
  return request({
    url: '/lkai-datamatching/diagnosis/' + id,
    method: 'get'
  })
}

// 新增医院诊断标准化结果
export function addDiagnosis(data) {
  return request({
    url: '/lkai-datamatching/diagnosis',
    method: 'post',
    data: data
  })
}

// 修改医院诊断标准化结果
export function updateDiagnosis(data) {
  return request({
    url: '/lkai-datamatching/diagnosis',
    method: 'put',
    data: data
  })
}

// 删除医院诊断标准化结果
export function delDiagnosis(id) {
  return request({
    url: '/lkai-datamatching/diagnosis/' + id,
    method: 'delete'
  })
}
