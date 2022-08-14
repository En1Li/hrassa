<template>
  <div class="dashboard-container">
    <div class="app-container">
      <Upload-excel :beforeUpload="beforeUploadFn" :on-success="success" />
    </div>
  </div>
</template>

<script>
import employees from '@/constant/employees'
const { importmapKeyPath } = employees
import { importEmployees } from '@/api/employees'
import { formatTime } from '@/filters'
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    // 上传之前的处理
    beforeUploadFn({ name }) {
      if (!name.endsWith('.xlsx')) {
        this.$message.error('请选择xlsx文件')
        return false
      }
      return true
    },
    // 上传成功后的处理
    async success({ header, results }) {
      const newArr = results.map((item) => {
        const obj = {}
        for (let key in importmapKeyPath) {
          if (key === '入职日期' || key === '转正日期') {
            const timestamp = item[key]
            const date = new Date((timestamp - 1) * 24 * 60 * 60 * 1000)
            date.setFullYear(date.getFullYear() - 70)
            obj[importmapKeyPath[key]] = formatTime(date)
          } else {
            obj[importmapKeyPath[key]] = item[key]
          }
        }
        return obj
      })
      console.log(newArr)
      await importEmployees(newArr)
      this.$message.success('导入成功')
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped></style>
