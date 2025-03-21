import httpInstance from '@/utils/http'
// 更新更新歌曲
export function updateSongAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/song/update',
    data
  })
}

export function getSongListAPI() {
  return httpInstance({
    method: 'POST',
    url: '/api/b/song/list'
  })
}
// 新增
export function addSongAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/song/add',
    data
  })
}
// 删除
export function deleteSongAPI(id) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/song/delete',
    data: {
      id
    }
  })
}
// 批量删除
export function deleteBatchSongAPI(ids) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/song/batchDelete',
    data: {
      ids
    }
  })
}

// 分页获取该歌曲对应评论
export function getSongCommentAPI({ id, current, size }) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/song/listComment',
    data: {
      id,
      current,
      size
    }
  })
}
// 删除评论
export function deleteSongCommentAPI(id) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/song/removeComment',
    data: {
      id
    }
  })
}
// 批量删除评论
export function deleteBatchSongCommentAPI(ids) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/song/batchRemoveComment',
    data: {
      ids
    }
  })
}
