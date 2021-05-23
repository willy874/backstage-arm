import Vue from 'vue'
import Vuex from 'vuex'
import globalModules from './global'
import adminModules from './admin'
import modelModules from './model'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    global: globalModules,
    admin: adminModules,
    model: modelModules,
  },
})
