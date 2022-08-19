import PageTools from '@/components/PageTools'
import UploadExcel from './UploadExcel'
import UploadImg from './UploadImg'
const conpoments = [PageTools, UploadExcel, UploadImg]
export default {
  install(Vue) {
    conpoments.forEach((component) => {
      Vue.component(component.name, component)
    })
  },
}
