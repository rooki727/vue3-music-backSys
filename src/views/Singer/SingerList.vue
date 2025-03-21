<script setup>
import SingerTable from './components/SingerTable.vue'
import { ref, onMounted, provide } from 'vue'
import addDialog from './components/addDialog.vue'
import { ElMessage } from 'element-plus'
import { deleteBatchSingerAPI, getSingerListAPI } from '@/apis/singer'

// 搜索功能变量
const searchInput = ref('')
const dialogTitle = ref('')
// 表格内容
const singerList = ref([])
const originalData = ref([])
// 获取table数据
const getTableForm = async () => {
  // 请求接口
  await getSingerListAPI().then((res) => {
    if (res.code === 200) {
      singerList.value = res.data
      originalData.value = res.data
    }
  })
}
// 使用 provide 暴露父组件的方法
provide('getTableForm', getTableForm)
// 添加对话框
const dialogFormVisible = ref(false)
const changeDialogVisible = (value) => {
  dialogFormVisible.value = value
}

// 点击打开添加表单
const openAddDialog = () => {
  dialogTitle.value = '添加歌手'
  changeDialogVisible(true)
}

// 搜索功能
const resetSearch = () => {
  searchInput.value = ''
  singerList.value = [...originalData.value]
}
let debounceTimer = null // 在函数外部定义定时器变量，以保证它在多个调用之间是共享的

const handleSearch = (inputvalue) => {
  // 清除上一次的定时器
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  // 设置新的定时器
  debounceTimer = setTimeout(() => {
    // 如果输入为空，恢复原始数据
    if (inputvalue === '') {
      singerList.value = [...originalData.value]
    } else {
      // 根据输入值过滤数据
      const filteredData = originalData.value.filter((item) => item?.name?.includes(inputvalue))
      // 更新表格数据
      singerList.value = filteredData
    }
  }, 500) // 500毫秒后触发搜索，可以根据需要调整
}

// 批量删除功能
const delTableId = ref([])
const getDelTable = (value) => {
  delTableId.value = value
  console.log(delTableId.value)
}
const blukDel = async () => {
  if (delTableId.value.length > 0) {
    // 执行请求操作
    await deleteBatchSingerAPI(delTableId.value).then((res) => {
      if (res.code === 200) {
        getTableForm()
        ElMessage({ type: 'success', message: '批量删除成功' })
        // 删除完后清空数据
        delTableId.value = []
      }
    })
  } else {
    ElMessage({
      type: 'error',
      message: '请勾选需要删除的数据'
    })
  }
}

// 加载网页加载数据
onMounted(() => {
  getTableForm()
})
</script>

<template>
  <addDialog
    :title="dialogTitle"
    :dialogFormVisible="dialogFormVisible"
    @changeDialogVisible="changeDialogVisible"
    @updateList="getTableForm"
  ></addDialog>
  <div class="search">
    <el-input
      label="search"
      v-model="searchInput"
      style="width: 33rem; margin-left: 1rem"
      placeholder="根据歌手名字搜索"
      @input="handleSearch"
      clearable
    ></el-input>
    <el-button type="primary" @click="resetSearch" style="margin-left: 3rem">重置</el-button>
  </div>
  <el-divider border-style="dashed" />
  <div class="opTable">
    <el-button @click="openAddDialog" type="warning" style="margin-left: 2rem"
      ><el-icon><Plus /></el-icon>添加歌手</el-button
    >
    <el-button type="danger" @click="blukDel"
      ><el-icon><DeleteFilled /></el-icon>批量删除</el-button
    >
  </div>

  <el-divider border-style="dashed" />
  <div class="table">
    <div class="taleDiv">
      <SingerTable :singerList="singerList" @getDelTable="getDelTable"></SingerTable>
    </div>
  </div>
</template>


<style scoped lang="scss">
</style>