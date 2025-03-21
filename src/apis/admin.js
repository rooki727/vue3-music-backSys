import httpInstance from '@/utils/http'
// 获取配置
export function adminLoginAPI(data) {
  return httpInstance({
    method: 'post',
    url: '/api/b/admin/login',
    data
  })
}
// 登出
export function adminLogoutAPI() {
  return httpInstance({
    method: 'post',
    url: '/api/b/admin/logout'
  })
}

// 更新基础信息
export function updateBasicInfoAPI(data) {
  return httpInstance({
    method: 'post',
    url: '/api/b/admin/updateBaseInfo',
    data
  })
}
//更新头像
export function updateAvatarAPI(data) {
  return httpInstance({
    method: 'post',
    url: '/api/b/admin/updateAvatar',
    data
  })
}
// 更新密码
export function updatePasswordAPI(data) {
  return httpInstance({
    method: 'post',
    url: '/api/b/admin/updatePassword',
    data
  })
}
