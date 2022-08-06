<template>
  <el-row style="width: 100%" type="flex">
    <el-col>{{ treeNode.name }}</el-col>
    <el-col :span="5">
      <el-row type="flex">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown :hide-on-click="false">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="$emit('add', treeNode)"
                >添加部门</el-dropdown-item
              >
              <el-dropdown-item
                v-if="!isRoot"
                @click.native="$emit('edit', treeNode)"
                >编辑部门</el-dropdown-item
              >
              <el-dropdown-item v-if="!isRoot" @click.native="onRemove"
                >删除部门</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDeptsApi } from '@/api/departments'
export default {
  props: {
    treeNode: {
      type: Object,
      required: true,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },

  created() {},

  methods: {
    async onRemove() {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        await delDeptsApi(this.treeNode.id)
        this.$message.success('删除成功')
        this.$emit('remove')
      } catch (error) {}
    },
  },
}
</script>

<style scoped></style>
