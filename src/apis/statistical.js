import httpInstance from '@/utils/http'
// 获取
export function statisticalAPI() {
  return httpInstance({
    method: 'post',
    url: '/api/b/statistical/all'
  })
}
