import axios from 'axios'
import * as api from '@/api'

export default {
  install(Vue, ops) {
    Vue.prototype.$axios = axios
    Vue.prototype.$request = api
  },
}
