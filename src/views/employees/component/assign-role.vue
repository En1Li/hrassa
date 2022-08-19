<template>
  <el-dialog @open="onOpen" @close="close" title="分配角色" :visible="visible">
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in rolesList" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="assignRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRolesList } from '@/api/roles'
import { getUserDatail } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    currentRow: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      checkList: [],
      rolesList: [],
    }
  },

  created() {},

  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    async getRolesList() {
      const res = await getRolesList()
      console.log(res.rows)
      this.rolesList = res.rows
    },
    onOpen() {
      this.getRolesList()
      this.getUserDatail()
    },
    async getUserDatail() {
      const res = await getUserDatail(this.currentRow)
      console.log(res.roleIds)
      this.checkList = res.roleIds
    },
    async assignRole() {
      if (!this.checkList.length) {
        return this.$message.error('请选择角色')
      }
      await assignRoles({
        id: this.currentRow,
        roleIds: this.checkList,
      })
      this.$message.success('分配成功')
      this.close()
    },
  },
}
</script>

<style scoped></style>
