import employeesPoint from '@/constant/permission'

export default {
  data() {
    return {
      point: employeesPoint,
    }
  },
  methods: {
    idHas(point) {
      const flag = this.$store.state.permission.points.includes(point)
      return !flag
    },
  },
}
