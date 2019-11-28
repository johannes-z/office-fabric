import 'reflect-metadata'
import Vue, { CreateElement } from 'vue'
import VueRouter from 'vue-router'
import Preview from './Preview.vue'
import routes from '@/router/routes'

import Fabric, { ITheme } from './plugins/office-fabric'
import { IPalette } from './types/IPalette'

Vue.use(Fabric, {
} as ITheme)

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
})

Vue.config.productionTip = false

new Vue({
  render: (h: CreateElement) => h(Preview),
  router,
}).$mount('#app')
