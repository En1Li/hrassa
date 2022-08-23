<template>
  <svg-icon
    className="fullscreen"
    iconClass="fullscreen"
    @click="onfullscreen"
  ></svg-icon>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'FullScreen',
  data() {
    return {}
  },

  created() {},

  methods: {
    onfullscreen() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    },
  },
}
</script>

<style scoped>
.fullscreen {
  color: #fff;
}
</style>
