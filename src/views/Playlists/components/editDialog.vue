<script  setup>
import { reactive, computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { updatePlaylistAPI } from '@/apis/playlist'
// 弹框功能设置
const props = defineProps(['dialogFormVisible', 'title', 'clickRow', 'cannotInpId'])
const centerDialogVisible = computed(() => props.dialogFormVisible)
const title = computed(() => props.title)
const clickRow = computed(() => props.clickRow)
const emit = defineEmits(['changeDialogVisible', 'updateClickRow', 'updateList'])
const changeDialogVisible = () => {
  emit('updateClickRow', {}) // 发送事件给父组件，请求修改props.clickRow的值为null
  emit('changeDialogVisible', false)
}
const addForm = ref(null)
const addform = reactive({
  id: null,
  img: '',
  title: '',
  style: '',
  introduction: ''
})
const rules = {
  title: [
    {
      required: true,
      message: '请输入歌单标题',
      trigger: 'blur'
    }
  ],
  style: [
    {
      required: true,
      message: '请输入歌单风格',
      trigger: 'blur'
    }
  ],
  introduction: [
    {
      required: true,
      message: '请输入歌单简介', // 如果未输入电子邮件地址，则显示此消息
      trigger: 'blur'
    }
  ]
}
const submitadd = (addForm) => {
  addForm.validate((valid) => {
    if (valid) {
      console.log(addform)

      // api数据请求，添加该用户的信息
      emit('changeDialogVisible', false)
      updatePlaylistAPI({
        id: addform.id,
        img: addform.img,
        title: addform.title,
        style: addform.style,
        introduction: addform.introduction
      })
        .then(() => {
          // 如果 addUser 没有报错，则执行成功提示
          ElMessage({ type: 'success', message: '修改成功' })
          emit('changeDialogVisible', false)
          emit('updateList')
        })
        .catch(() => {
          // 处理请求失败的情况
          ElMessage({ type: 'erro', message: '修改失败！请检查输入信息' })
          // 在此处可以添加相应的错误处理逻辑，例如提示用户登录失败等
        })
    } else {
      // 如果表单验证不通过，提醒
      ElMessage({ type: 'error', message: '修改失败！请检查输入信息' })
    }
  })
}
// 上传图片
const handleAvatarSuccess = (response) => {
  addform.img = response.data
}
// 上传图片前的校验
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    this.$message.error('只能上传图片')
  }
  return isImage // 确保文件是图片
}
// watch
watch(
  () => clickRow.value,
  (oldVal) => {
    Object.assign(addform, oldVal)
  }
)
</script>

<template>
  <el-dialog
    :model-value="centerDialogVisible"
    :title="title"
    width="500"
    align-center
    :show-close="false"
    :lock-scroll="false"
    :close-on-click-modal="false"
  >
    <el-form :model="addform" :rules="rules" ref="addForm">
      <el-form-item label="id" label-width="8.75rem" prop="id">
        <el-input v-model="addform.id" autocomplete="off" :disabled="cannotInpId" />
      </el-form-item>
      <el-form-item label="歌单封面" label-width="8.75rem" prop="img">
        <!-- 增加修改图标 -->
        <div style="display: flex">
          <img style="width: 80px; height: 80px" v-if="addform.img" :src="addform.img" alt="" />
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8080/api/file/uploadImage"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeUpload"
            name="image"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="标题" label-width="8.75rem" prop="title">
        <el-input v-model="addform.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="简介" label-width="8.75rem" prop="introduction">
        <el-input v-model="addform.introduction" autocomplete="off" type="textarea" />
      </el-form-item>
      <el-form-item label="风格" label-width="8.75rem" prop="style">
        <el-input v-model="addform.style" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="changeDialogVisible">取消</el-button>
        <el-button type="primary" @click="submitadd(addForm)"> 更新 </el-button>
      </div>
    </template>
  </el-dialog>
</template>


<style scoped>
.avatar-uploader {
  width: 80px;
  height: 80px;
  margin-left: 10px;
  border: 1px solid gainsboro;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
}

.avatar-uploader .el-icon {
  font-size: 50px;
  color: #8c939d;
}

.avatar-uploader .el-icon:hover {
  color: #409eff;
}
</style>