import request from '@/utils/request'

// 查询说明书数据列表
export function listInstruction(query) {
  return request({
    url: '/drug/instruction/list',
    method: 'get',
    params: query
  })
}

// 查询说明书数据详细
export function getInstruction(id) {
  return request({
    url: '/drug/instruction/' + id,
    method: 'get'
  })
}

// 新增说明书数据
export function addInstruction(data) {
  return request({
    url: '/drug/instruction',
    method: 'post',
    data: data
  })
}

// 修改说明书数据
export function updateInstruction(data) {
  return request({
    url: '/drug/instruction',
    method: 'put',
    data: data
  })
}

// 删除说明书数据
export function delInstruction(id) {
  return request({
    url: '/drug/instruction/' + id,
    method: 'delete'
  })
}
