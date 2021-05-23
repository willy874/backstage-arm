import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/zh-cn'

export default {
  install(Vue) {
    Vue.component('DatePicker', DatePicker)
  },
}
