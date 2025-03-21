import httpInstance from '@/utils/http'
// 获取
export function getSingerListAPI() {
  return httpInstance({
    method: 'POST',
    url: '/api/b/singer/list'
  })
}
// 新增
export function addSingerAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/singer/add',
    data
  })
}
// 编辑
export function updateSingerAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/singer/update',
    data
  })
}
// 删除
export function deleteSingerAPI(id) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/singer/delete',
    data: {
      id
    }
  })
}

// 获取歌手歌曲列表
export function getSingerSongListAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/song/list/singerId',
    data
  })
}

// 批量删除
export function deleteBatchSingerAPI(ids) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/singer/batchDelete',
    data: {
      ids
    }
  })
}

// 添加歌手歌曲
export function addSingerSongAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/singer/addSong',
    data
  })
}
// 删除歌手歌曲
export function removeSongAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/singer/removeSong',
    data
  })
}

// addSongById
export function addSongByIdAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/singer/addSong/id',
    data
  })
}

// 获取歌手详情
export function batchRemoveSongAPI(data) {
  return httpInstance({
    method: 'POST',
    url: '/api/b/singer/batchRemoveSong',
    data
  })
}
