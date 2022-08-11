<template>
  <el-card class="box-card">
    <el-row type="flex">
      <el-col>
        <el-tag v-if="idShowLeft">
          <i class="el-icon-info"></i>
          <slot name="left-tag" />
        </el-tag>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="right" />
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'PageTools',
  props: {
    idShowLeft: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {}
  },

  created() {},

  methods: {},
}
</script>

<style scoped></style>
