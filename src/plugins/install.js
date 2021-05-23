import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import UUID from 'vue-uuid'
import icon from './icon'
import CKEditor from './ckeditor'
import DatePicker from './datepicker'
import Swal from './sweetalert2'

export default {
  install(Vue) {
    Vue.use(BootstrapVue).use(IconsPlugin).use(CKEditor).use(UUID).use(icon).use(DatePicker).use(Swal)
  },
}
