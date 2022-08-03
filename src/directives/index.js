export const imgError = {
  // 当绑定的元素插入到DOM元素中时...   el就是绑定的元素 {value}是解构传入的参数
  inserted: function (el, { value }) {
    // onerror事件 报错触发
    el.onerror = function () {
      el.src = value
    }
  },
}
