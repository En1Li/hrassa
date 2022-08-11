<template>
  <el-dialog
    @close="closeFn"
    :title="dialogTitle"
    :visible="visible"
    width="50%"
  >
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
import {
  getDeptsApi,
  addDevalopment,
  getDeptById,
  editDeptById,
} from '@/api/departments'
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
            validator: async (rule, value, callback) => {
              if (this.formData.id) {
                const { depts } = await getDeptsApi()
                const filtersDepts = depts.filter(
                  (item) =>
                    item.pid === this.formData.pid &&
                    item.id !== this.formData.id,
                )
                const isRepeat = filtersDepts.some(
                  (item) => item.name === value,
                )
                isRepeat ? callback(new Error('部门重复')) : callback()
              } else {
                if (!this.currentNode.children) return callback()
                const isReplt = this.currentNode.children.some((item) => {
                  return item.name === value.trim()
                })
                if (isReplt) return callback(new Error('部门重复'))
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          {
            validator: async (rule, value, callback) => {
              const { depts } = await getDeptsApi()
              let idRepeat
              if (this.formData.id) {
                idRepeat = depts
                  .filter((item) => item.id !== this.formData.id)
                  .some((item) => item.code === value)
              } else {
                idRepeat = depts.some((item) => item.code === value)
              }
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

  computed: {
    dialogTitle() {
      return this.formData.id ? '编辑部门' : '添加部门'
    },
  },
  created() {
    this.getemployeesList()
  },

  methods: {
    async getemployeesList() {
      const res = await getemployeesList()
      this.employeesList = res
    },
    closeFn() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
      }
    },
    async onSave() {
      try {
        if (this.formData.id) {
          await editDeptById(this.formData)
           this.$message.success('编辑成功')
            this.closeFn()
            this.$emit('addSuccess')
        } else {
          await this.$refs.form.validate()
          this.formData.pid = this.currentNode.id
          await addDevalopment(this.formData)
          this.closeFn()
          await this.$emit('addSuccess')
          this.$message.success('添加成功')
        }
      } catch (error) {
        this.$message.error('操作部门失败')
      }
    },
    async getDeptById(id) {
      console.log(this.currentNode);
      this.formData = await getDeptById(id)
    },
  },
}
</script>

<style scoped></style>
