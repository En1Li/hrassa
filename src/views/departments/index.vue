<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card v-loading="loading"  class="box-card">
        <!-- 头部 -->
        <treeToos
          :isRoot="true"
          :treeNode="company"
          @add="dialogVisible = true"
        ></treeToos>
        <!-- 树形结构 -->
        <el-tree :data="treeDate" :props="defaultProps" default-expand-all>
          <template v-slot="scoped">
            <treeToos
              :treeNode="scoped.data"
              @remove="loadDepts"
              @add="addFn"
              @edit="editFn"
            ></treeToos>
          </template>
        </el-tree>
      </el-card>
    </div>
    <addDept
    ref="addDept"
      @addSuccess="addSuccessFn"
      :visible.sync="dialogVisible"
      :currentNode="currentNode"
    ></addDept>
  </div>
</template>

<script>
import treeToos from './component/tree-toos'
import addDept from './component/add-dept'
import { getDeptsApi } from '@/api/departments'
import { transListToTree } from '@/utils'
export default {
  data() {
    return {
      treeDate: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' },
      ],
      defaultProps: {
        label: 'name',
      },
      company: { name: '传智教育', manager: '负责人' },
      dialogVisible: false,
      currentNode: {},
      loading: false,
    }
  },
  components: {
    treeToos,
    addDept,
  },

  created() {
    this.loadDepts()
  },

  methods: {
    async loadDepts() {
      this.loading= true
      const res = await getDeptsApi()
      this.treeDate = transListToTree(res.depts, '')
      this.loading= false
    },
    addFn(val) {
      this.dialogVisible = true
      this.currentNode = val
    },
    addSuccessFn() {
      this.loadDepts()
    },
    editFn(val) {
      // this.currentNode = val
      this.dialogVisible = true
      this.$refs.addDept.getDeptById(val.id)
    },
  },
}
</script>

<style scoped lang="less"></style>
