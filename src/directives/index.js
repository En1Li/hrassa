import store from '@/store'
export const imgError = {
  // 当绑定的元素插入到DOM元素中时...   el就是绑定的元素 {value}是解构传入的参数
  inserted: function (el, { value }) {
    // onerror事件 报错触发
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },
  update: function (el, { value }) {
    // onerror事件 报错触发
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },
}

export const isHas = (el, binding) => {
  const has = store.state.permission.points.includes(binding.value)
  if (!has) {
    el.remove()
  }
}
