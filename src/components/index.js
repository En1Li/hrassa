import PageTools from '@/components/PageTools'
const conpoments = [PageTools]
export default {
  install(Vue) {
    conpoments.forEach((component) => {
      Vue.component(component.name, component)
    })
  },
}
