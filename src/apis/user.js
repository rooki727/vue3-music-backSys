import httpInstance from '@/utils/http'
// 获取
export function getUserListAPI() {
  return httpInstance({
    method: 'POST',
    url: '/api/b/user/list'
  })
}
// 新增
export function addUserAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/user/add',
    data
  })
}
// 编辑
export function updateUserAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/user/update',
    data
  })
}
// 删除
export function deleteUserAPI(id) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/user/delete',
    data: {
      id
    }
  })
}

// 批量删除
export function deleteBatchUserAPI(ids) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/user/batchDelete',
    data: {
      ids
    }
  })
}
