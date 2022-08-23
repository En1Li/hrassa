<template>
  <el-dropdown @command="onCommand">
    <span class="el-dropdown-link">
      语言<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        :disabled="key === $i18n.locale"
        v-for="(val, key) in messages"
        :key="key"
        :command="key"
        >{{ val.name }}</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { messages } from '@/i18n'
import Cookies from 'js-cookie'

export default {
  name: 'ToggleLang',

  data() {
    return {
      messages,
    }
  },

  created() {},

  methods: {
    onCommand(val) {
      this.$i18n.locale = val
      this.$router.go(0)
      Cookies.set('lang' , val)
    },
  },
}
</script>

<style scoped></style>
