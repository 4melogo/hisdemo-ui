import request from '@/utils/request'

// 查询说明书维护列表
export function listInstruction(query) {
  return request({
    url: '/lkai-rud/instruction/list',
    method: 'get',
    params: query
  })
}

// 查询说明书维护详细
export function getInstruction(id) {
  return request({
    url: '/lkai-rud/instruction/' + id,
    method: 'get'
  })
}

// 新增说明书维护
export function addInstruction(data) {
  return request({
    url: '/lkai-rud/instruction',
    method: 'post',
    data: data
  })
}

// 修改说明书维护
export function updateInstruction(data) {
  return request({
    url: '/lkai-rud/instruction',
    method: 'put',
    data: data
  })
}

// 删除说明书维护
export function delInstruction(id) {
  return request({
    url: '/lkai-rud/instruction/' + id,
    method: 'delete'
  })
}
