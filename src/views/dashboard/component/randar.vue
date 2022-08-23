<template>
  <div id="main" class="randarCharts"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {}
  },

  created() {},
  mounted() {
    this.initRandar()
  },
  methods: {
    initRandar() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'))
      // 绘制图表
      const randarOption = {
        backgroundColor: 'black',
        title: {
          text: '人员绩效',
          textStyle: {
            color: 'red',
          },
        },
        legend: {
          data: ['张三', '李四'],
          textStyle: {
            color: 'red',
            fontSize: 20,
          },
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: 'Sales', max: 100 },
            { name: 'Administration', max: 100 },
            { name: 'Information Technology', max: 100 },
            { name: 'Customer Support', max: 100 },
            { name: 'Development', max: 100 },
            { name: 'Marketing', max: 100 },
          ],
          axisName: {
            color: 'rgb(23, 197, 102)',
          },
          splitArea: {
            areaStyle: {
              color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10,
            },
          },
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [50, 40, 80, 30, 10, 70],
                name: '张三',
              },
              {
                value: [50, 50, 80, 30, 90, 70],
                name: '李四',
              },
            ],
          },
        ],
      }
      myChart.setOption(randarOption)
    },
  },
}
</script>

<style scoped lang="scss">
.randarCharts {
  width: 800px;
  height: 500px;
}
</style>
