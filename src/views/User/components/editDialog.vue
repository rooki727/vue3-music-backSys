<script  setup>
import { reactive, computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { updateUserAPI } from '@/apis/user'
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
  name: '',
  password: '',
  verify: '',
  gender: '',
  phone: null,
  email: ''
})
const rules = {
  name: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [
    {
      pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      message: '密码为至少8位，包含字母和数字',
      trigger: 'blur'
    }
  ],
  gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
  phone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    { type: Number, min: 11, message: '手机号必须为11位数字', trigger: 'blur' },
    {
      pattern: /^[0-9]+$/, // 使用正则表达式限制输入只能为数字字符
      message: '手机号必须为数字', // 自定义提示消息
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: '请输入电子邮件地址', // 如果未输入电子邮件地址，则显示此消息
      trigger: 'blur'
    },
    {
      type: 'email',
      message: '请输入有效的电子邮件地址', // 如果输入的电子邮件地址格式不正确，则显示此消息
      trigger: ['blur', 'change']
    }
  ]
}
const submitadd = (addForm) => {
  addForm.validate((valid) => {
    if (valid) {
      console.log(addform)

      // api数据请求，添加该用户的信息
      emit('changeDialogVisible', false)
      updateUserAPI({
        id: addform.id,
        name: addform.name,
        password: addform.password ? addform.password : null,
        gender: addform.gender,
        phone: parseInt(addform.phone),
        email: addform.email
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
      <el-form-item label="用户名" label-width="8.75rem" prop="name">
        <el-input v-model="addform.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" label-width="8.75rem" prop="password">
        <el-input v-model="addform.password" autocomplete="off" type="password" show-password />
      </el-form-item>
      <el-form-item label="性别" label-width="8.75rem" prop="gender">
        <el-radio-group v-model="addform.gender">
          <el-radio value="男">男</el-radio>
          <el-radio value="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电话" label-width="8.75rem" prop="phone">
        <el-input v-model="addform.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" label-width="8.75rem" prop="email">
        <el-input type="email" v-model="addform.email" autocomplete="off" />
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


