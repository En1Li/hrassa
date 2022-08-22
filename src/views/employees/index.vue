<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="true">
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            v-isHas="point.employees.import"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="exportOut"
            >导出</el-button
          >
          <el-button
            :disabled="idHas(point.employees.add)"
            size="small"
            type="primary"
            @click="addEmploy"
            >新增员工</el-button
          >
        </template>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employeesInfo">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="员工">
            <template slot-scope="{ row }">
              <img
                v-imgError="require('@/assets/common/head.jpg')"
                :src="row.staffPhoto"
                alt=""
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
                @click="showErcodeDialog(row.staffPhoto)"
              />
            </template>
          </el-table-column>
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            :formatter="formOfEmployment"
            prop="formOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <template v-slot="scoped">
              {{ scoped.row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">
            <template v-slot="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template v-slot="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button
                type="text"
                size="small"
                @click="showAssignRole(row.id)"
                >角色</el-button
              >
              <el-button
                :disabled="idHas(point.employees.del)"
                type="text"
                size="small"
                @click="delEmploy(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :page-size="pages.size"
            :current-page="pages.page"
            :total="total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>

    <addEmployee
      @on-success="getemployeesInfo"
      :visible.sync="addEmployVisible"
    ></addEmployee>
    <el-dialog title="头像二维码" :visible.sync="dialogVisible">
      <canvas id="canvas"></canvas>
    </el-dialog>
    <AssignRole :visible.sync="visible" :currentRow="currentRow"></AssignRole>
  </div>
</template>
<script>
import { getemployeesInfo, delEmployee } from '@/api/employees'
import employees from '@/constant/employees'
import AssignRole from './component/assign-role.vue'
const { exportExcelMapPath, hireType } = employees
import addEmployee from './component/addEmploy.vue'
import QRcode from 'qrcode'
import employeesPoint from '@/constant/permission'
export default {
  data() {
    return {
      employeesInfo: [],
      total: 0,
      pages: {
        page: 1,
        size: 5,
      },
      addEmployVisible: false,
      dialogVisible: false,
      visible: false,
      currentRow: '',
      point: employeesPoint,
    }
  },
  components: {
    addEmployee,
    AssignRole,
  },

  created() {
    this.getemployeesInfo()
  },

  methods: {
    async getemployeesInfo() {
      const res = await getemployeesInfo(this.pages)
      console.log(res)
      this.employeesInfo = res.rows
      this.total = res.total
    },
    changePage(val) {
      this.pages.page = val
      this.getemployeesInfo()
    },
    formOfEmployment(row, column, cellValue, index) {
      const findItem = employees.hireType.find((item) => item.id === cellValue)
      return findItem ? findItem.value : '未知'
    },
    async delEmploy(id) {
      await this.$confirm('是否确认删除?')
      await delEmployee(id)
      this.$message('删除成功')
      this.getemployeesInfo()
    },
    addEmploy() {
      this.addEmployVisible = true
    },
    async exportOut() {
      const { rows } = await getemployeesInfo({
        page: 1,
        size: this.total,
      })
      const header = Object.keys(exportExcelMapPath)
      const data = rows.map((item) => {
        return header.map((h) => {
          if (h === '聘用形式') {
            const findItem = hireType.find((hire) => {
              return hire.id === item[exportExcelMapPath[h]]
            })
            return findItem ? findItem.value : '位置'
          } else {
            return item[exportExcelMapPath[h]]
          }
        })
      })
      await import('@/vendor/Export2Excel').then((excel) => {
        excel.export_json_to_excel({
          header, //表头 必填
          data, //具体数据 必填
          filename: 'excel-list', //非必填
          autoWidth: true, //非必填
          bookType: 'xlsx', //非必填
        })
      })
    },
    showErcodeDialog(img) {
      if (!img) return this.$message.error('该用户没有设置头像')
      this.dialogVisible = true
      this.$nextTick(() => {
        var canvas = document.getElementById('canvas')
        QRcode.toCanvas(canvas, img)
      })
    },
    showAssignRole(id) {
      this.visible = true
      this.currentRow = id
    },
    idHas(point) {
      const flag = this.$store.state.permission.points.includes(point)
      return !flag
    },
  },
}
</script>

<style scoped lang="less"></style>
