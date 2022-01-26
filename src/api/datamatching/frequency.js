import request from '@/utils/request'

// 查询医院频次标准化对码结果列表
export function listFrequency(query) {
  return request({
    url: '/lkai-datamatching/frequency/list',
    method: 'get',
    params: query
  })
}

// 查询医院频次标准化对码结果详细
export function getFrequency(id) {
  return request({
    url: '/lkai-datamatching/frequency/' + id,
    method: 'get'
  })
}

// 新增医院频次标准化对码结果
export function addFrequency(data) {
  return request({
    url: '/lkai-datamatching/frequency',
    method: 'post',
    data: data
  })
}

// 修改医院频次标准化对码结果
export function updateFrequency(data) {
  return request({
    url: '/lkai-datamatching/frequency',
    method: 'put',
    data: data
  })
}

// 删除医院频次标准化对码结果
export function delFrequency(id) {
  return request({
    url: '/lkai-datamatching/frequency/' + id,
    method: 'delete'
  })
}

//当点击选择框时候查询频次描述
export function getFrequencyCatelogList(query) {
  return request({
    url: '/lkai-datamatching/frequency/getFrequencyCatelogList?frequencyName='+query,
    method: 'get',
  })
}
