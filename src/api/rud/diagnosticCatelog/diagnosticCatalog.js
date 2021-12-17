import request from '@/utils/request'

// 查询标准ICD10诊断目录列表
export function listDiagnosticCatalog(query) {
  return request({
    url: '/lkai-rud/diagnosticCatalog/list',
    method: 'get',
    params: query
  })
}

export function getLabelList() {
  return request({
    url: '/lkai-rud/label/labelList',
    method: 'get'
  })
}

// 查询标准ICD10诊断目录详细
export function getDiagnosticCatalog(id) {
  return request({
    url: '/lkai-rud/diagnosticCatalog/' + id,
    method: 'get'
  })
}

// 新增标准ICD10诊断目录
export function addDiagnosticCatalog(data) {
  return request({
    url: '/lkai-rud/diagnosticCatalog',
    method: 'post',
    data: data
  })
}

// 修改标准ICD10诊断目录
export function updateDiagnosticCatalog(data) {
  return request({
    url: '/lkai-rud/diagnosticCatalog',
    method: 'put',
    data: data
  })
}

// 删除标准ICD10诊断目录
export function delDiagnosticCatalog(id) {
  return request({
    url: '/lkai-rud/diagnosticCatalog/' + id,
    method: 'delete'
  })
}
