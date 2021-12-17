import request from '@/utils/request'

// 查询医院给药途径标准化结果列表
export function listDrugroute(query) {
  return request({
    url: '/lkai-datamatching/drugroute/list',
    method: 'get',
    params: query
  })
}

// 查询医院给药途径标准化结果详细
export function getDrugroute(id) {
  return request({
    url: '/lkai-datamatching/drugroute/' + id,
    method: 'get'
  })
}

// 新增医院给药途径标准化结果
export function addDrugroute(data) {
  return request({
    url: '/lkai-datamatching/drugroute',
    method: 'post',
    data: data
  })
}

// 修改医院给药途径标准化结果
export function updateDrugroute(data) {
  return request({
    url: '/lkai-datamatching/drugroute',
    method: 'put',
    data: data
  })
}

// 删除医院给药途径标准化结果
export function delDrugroute(id) {
  return request({
    url: '/lkai-datamatching/drugroute/' + id,
    method: 'delete'
  })
}

export function getRouteCatelogList(query) {
  return request({
    url: '/lkai-datamatching/drugroute/getRouteCatelogList?routeName='+query,
    method: 'get',
  })
}
