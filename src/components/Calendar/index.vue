<template>
  <div class="calendar">
    <el-row type="flex" justify="end">
      <el-col :span="5">
        <el-select @change="updateCalendar" v-model="currentYear" placeholder="请选择">
          <el-option
            v-for="item in years"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select @change="updateCalendar" v-model="currentMonth" placeholder="请选择">
          <el-option v-for="item in 12" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date }">
        <div class="cell-box">
          {{ date.getDate() }}
          <span v-if="getWeek(date)">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      currentYear: '',
      currentMonth: '',
      currentDate: '',
      years: [],
    }
  },

  created() {
    this.initCalendar()
  },

  methods: {
    initCalendar() {
      const time = new Date()
      this.currentYear = time.getFullYear()
      this.currentMonth = time.getMonth() + 1
      //使用Array.fill获取当前年份前后5年的数组
      this.years = Array(11)
        .fill(this.currentYear - 5)
        .map((item, index) => item + index)
    },
    getWeek(day){
      return day.getDay() === 6  || day.getDay() === 0
    },
    updateCalendar(){
      this.currentDate = this.currentYear + '-' + this.currentMonth
    }
  },
}
</script>

<style scoped lang="scss">
::v-deep .el-calendar {
  .el-calendar__header {
    display: none;
  }
}
</style>
