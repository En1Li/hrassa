<template>
  <el-dialog @close="closeFn" title="提示" :visible="visible" width="50%">
    <el-form
      :model="formData"
      :rules="formRules"
      ref="form"
      label-width="100px"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="请输入部门名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="formData.code"
          placeholder="请输入部门编码"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width: 100%"
          placeholder="请选择部门负责人"
        >
          <el-option
            v-for="item in employeesList"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          type="textarea"
          placeholder="请输入部门介绍"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeFn">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDeptsApi, addDevalopment } from '@/api/departments'
import { getemployeesList } from '@/api/employees'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    currentNode: {
      type: Object,
    },
  },
  data() {
    return {
      employeesList: [],
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
      },
      formRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!this.currentNode.children) return callback()
              const isReplt = this.currentNode.children.some((item) => {
                return item.name === value.trim()
              })
              if (isReplt) return callback(new Error('部门重复'))
              callback()
            },
            trigger: 'blur',
          },
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          {
            validator: async (rule, value, callback) => {
              const { depts } = await getDeptsApi()
              const idRepeat = depts.some((item) => item.code === value)
              idRepeat ? callback(new Error('部门编码重复')) : callback()
            },
          },
        ],
        manager: [
          { required: true, message: '请输入部门管理者', trigger: 'change' },
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' },
        ],
      },
    }
  },

  created() {
    this.getemployeesList()
  },

  methods: {
    async getemployeesList() {
      const res = await getemployeesList()
      console.log(res)
      this.employeesList = res
    },
    closeFn() {
      this.$emit('update:visible', false)
    },
    async onSave() {
      await this.$refs.form.validate()
      this.formData.pid = this.currentNode.id
      await addDevalopment(this.formData)
      this.closeFn()
      await this.$emit('addSuccess')
      this.$message.success('添加成功')
    },
  },
}
</script>

<style scoped></style>
