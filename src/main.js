import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import container from './container'
import admin from './admin'
import Database from './database'
import mixin from './utility/mixin'
import globalData from './utility/global-vm'
import api from './api/install'
import components from './components/install'
import plugins from './plugins/install'
import axios from 'axios'

axios('http://localhost:4000/api/token').catch(() => {
  console.log(
    '%c請開啟模擬伺服器: npm run app',
    'color: #f00;background: #ff000011;padding: 2px 6px;border-radius: 4px;'
  )
})

Vue.config.devtools = true
Vue.config.productionTip = false
Vue.mixin(mixin)
  .use(container)
  .use(admin, { auth: false, store, router })
  .use(Database, { store, router })
  .use(api)
  .use(plugins)
  .use(components)
  .use(globalData)

const VueConfig = {
  router,
  store,
  render: (h) => h(App),
}
const app = new Vue(VueConfig)
app.$mount('#app')

/**
 * <PhotoFrame v-model="images" :selecte-list="selecteImageList" />
 * <DatePicker v-model="Model.display_date" valueType="format" format="YYYY-MM-DD"
 */
