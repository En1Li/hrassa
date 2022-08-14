import PageTools from '@/components/PageTools'
import UploadExcel from './UploadExcel'
const conpoments = [PageTools,UploadExcel]
export default {
  install(Vue) {
    conpoments.forEach((component) => {
      Vue.component(component.name, component)
    })
  },
}
