import PageLayout from './PageLayout.vue'
import RouterSwitch from './RouterSwitch.vue'
import ArticelHeader from './ArticelHeader.vue'
import ArticelDetailHeader from './ArticelDetailHeader.vue'

export default {
  install(Vue) {
    Vue.component('PageLayout', PageLayout)
    Vue.component('RouterSwitch', RouterSwitch)
    Vue.component('ArticelHeader', ArticelHeader)
    Vue.component('ArticelDetailHeader', ArticelDetailHeader)
  },
}
