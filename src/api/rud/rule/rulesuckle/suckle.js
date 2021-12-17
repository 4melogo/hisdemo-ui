import request from '@/utils/request'

// 查询哺乳用药规则列表
export function listSuckle(query) {
  return request({
    url: '/lkai-rud/suckle/list',
    method: 'get',
    params: query
  })
}

// 查询哺乳用药规则详细
export function getSuckle(id) {
  return request({
    url: '/lkai-rud/suckle/' + id,
    method: 'get'
  })
}

// 新增哺乳用药规则
export function addSuckle(data) {
  return request({
    url: '/lkai-rud/suckle',
    method: 'post',
    data: data
  })
}

// 修改哺乳用药规则
export function updateSuckle(data) {
  return request({
    url: '/lkai-rud/suckle',
    method: 'put',
    data: data
  })
}

// 删除哺乳用药规则
export function delSuckle(id) {
  return request({
    url: '/lkai-rud/suckle/' + id,
    method: 'delete'
  })
}
