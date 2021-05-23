import Vue from 'vue'
import VueRouter from 'vue-router'
import getRoutes from './site-map'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: getRoutes(),
})

export default router
