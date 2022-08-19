<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="登录账户设置" name="first">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input style="width: 300px" v-model="formData.username" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  style="width: 300px"
                  type="password"
                  v-model="formData.password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveInfo">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="second">
            <userInfo />
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="third">
            <JobInfo></JobInfo>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDatail, saveUserDetailById } from '@/api/user'
import userInfo from '../component/user-info.vue'
import Cookies from 'js-cookie'
import JobInfo from '../component/job-info.vue'

export default {
  components: {
    userInfo,
    JobInfo,
  },
  data() {
    return {
      formData: {},
      activeName: Cookies.get('clickTab') || 'first',
    }
  },

  created() {
    this.getUserDatail()
  },

  methods: {
    async getUserDatail() {
      const res = await getUserDatail(this.$route.params.id)
      this.formData = res
    },
    async saveInfo() {
      await saveUserDetailById(this.formData)
      this.$message.success('更新成功')
    },
    handleClick() {
      Cookies.set('clickTab', this.activeName)
    },
  },
}
</script>

<style scoped></style>
