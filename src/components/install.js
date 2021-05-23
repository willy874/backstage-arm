import { ImageBox, ImageCache, PhotoFrame, ImageUpload } from './image-viewbox'
import DataTable from './data-table/DataTable.vue'
import ErrorMessage from './error-message'

export default {
  install(Vue) {
    Vue.prototype.$image = new ImageCache()
    Vue.component('ImageBox', ImageBox)
    Vue.component('PhotoFrame', PhotoFrame)
    Vue.component('ImageUpload', ImageUpload)
    Vue.component('DataTable', DataTable)
    Vue.component('ErrorMessage', ErrorMessage)
  },
}
