<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button
            @click="add"
            type="primary"
            :disabled="idHas(point.roles.add)"
            >新增角色</el-button
          >
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column prop="address" label="操作">
              <template v-slot="scoped">
                <el-button
                  size="small"
                  type="success"
                  @click="setAssign(scoped.row.id)"
                  >分配权限</el-button
                >
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="pagesize"
            :page-sizes="[3, 5, 10, 15]"
            layout="sizes,prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input disabled v-model="compantInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                disabled
                v-model="compantInfo.companyAddress"
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input disabled v-model="compantInfo.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input disabled v-model="compantInfo.remarks"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 添加对话框 -->
    <el-dialog
      @close="dialogClose"
      title="编辑角色"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form
        :model="addRoleForm"
        :rules="addRoleFormRules"
        ref="form"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="addRoleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onaddRoles">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限 -->
    <el-dialog
      title="权限分配"
      :visible.sync="dialogVisibleSet"
      width="30%"
      @close="setClose"
    >
      <el-tree
        :data="permissions"
        :props="{ label: 'name' }"
        node-key="id"
        default-expand-all
        show-checkbox
        :default-checked-keys="defaultCheckKeys"
        v-if="dialogVisibleSet"
        ref="perTree"
      ></el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleSet = false">取 消</el-button>
        <el-button type="primary" @click="onSaveRight">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesList, addRole, getRolesInfo, assignPerm } from '@/api/roles'
import { getCompanyInfo } from '@/api/setting'
import { getPermissionList } from '@/api/permission'
import { transListToTree } from '@/utils'
import Mixins from '@/mixins/permissions'
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [],
      page: 1,
      total: 0,
      pagesize: 3,
      dialogVisible: false,
      dialogVisibleSet: false,
      addRoleForm: {
        name: '',
        description: '',
      },
      compantInfo: {},
      addRoleFormRules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        description: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
        ],
      },
      permissions: [],
      defaultCheckKeys: [],
      roleID: '',
    }
  },
  mixins: [Mixins],

  created() {
    this.getRolesList(), this.getCompanyInfo()
    this.getPermissionList()
  },

  methods: {
    async getRolesList() {
      const res = await getRolesList({
        page: this.page,
        pagesize: this.pagesize,
      })
      // console.log(res);
      this.tableData = res.rows
      this.total = res.total
    },
    handleCurrentChange(val) {
      this.page = val
      this.getRolesList()
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getRolesList()
    },
    add() {
      this.dialogVisible = true
    },
    async onaddRoles() {
      await this.$refs.form.validate()
      await addRole(this.addRoleForm)
      this.$message.success('添加成功')
      this.dialogVisible = false
      this.getRolesList()
    },
    dialogClose() {
      this.$refs.form.resetFields()
    },
    async getCompanyInfo() {
      const res = await getCompanyInfo(
        this.$store.state.user.userInfo.companyId,
      )
      this.compantInfo = res
      console.log(res)
    },
    async setAssign(id) {
      this.roleID = id
      this.dialogVisibleSet = true
      const res = await getRolesInfo(id)
      this.defaultCheckKeys = res.permIds
    },
    async getPermissionList() {
      const res = await getPermissionList()

      const treePermission = transListToTree(res, '0')
      // console.log(treePermission)
      this.permissions = treePermission
    },
    setClose() {
      this.defaultCheckKeys = []
    },
    async onSaveRight() {
      console.log(1234)
      await assignPerm({
        id: this.roleID,
        permIds: this.$refs.perTree.getCheckedKeys(),
      })
      this.$message.success('分配成功')
      this.dialogVisibleSet = false
    },
  },
}
</script>

<style scoped lang="less"></style>
