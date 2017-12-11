import { request, config } from 'utils'

const { api } = config
const { user,userValidstatus } = api

export async function query (params) {
  return request({
    url: user,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: user.replace('/:userid', ''),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: user,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: user,
    method: 'patch',
    data: params,
  })
}

export async function updateValidstatus (params) {
  return request({
    url: userValidstatus,
    method: 'patch',
    data: {userid: params.userid, validstatus: params.validstatus},
  })
}
