import httpInstance from '@/utils/http'
// 获取
export function getPlaylistListAPI() {
  return httpInstance({
    method: 'POST',
    url: '/api/b/playlist/list'
  })
}
// 新增
export function addPlaylistAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/playlist/add',
    data
  })
}
// 编辑
export function updatePlaylistAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/playlist/update',
    data
  })
}
// 删除
export function deletePlaylistAPI(id) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/playlist/delete',
    data: {
      id
    }
  })
}
// 批量删除
export function deleteBatchPlaylistAPI(ids) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/playlist/batchDelete',
    data: {
      ids
    }
  })
}

// 获取歌单歌曲列表
export function getPlaylistSongListAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/song/list/playlistId',
    data
  })
}

// 添加歌单歌曲
export function addPlaylistSongAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/playlist/addSong',
    data
  })
}
// 移除歌曲
export function removeSongAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/playlist/removeSong',
    data
  })
}

// 批量移除歌曲
export function batchRemoveSongAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/playlist/batchRemoveSong',
    data
  })
}
