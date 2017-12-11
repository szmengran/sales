import { request, config } from 'utils'

const { api } = config
const { role,roleValidstatus } = api

export async function query (params) {
  return request({
    url: role,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: role.replace('/:roleid', ''),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: role,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: role,
    method: 'patch',
    data: params,
  })
}

export async function updateValidstatus (params) {
  return request({
    url: roleValidstatus,
    method: 'patch',
    data: {roleid: params.roleid, validstatus: params.validstatus},
  })
}
