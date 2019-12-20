import Vue, { CreateElement } from 'vue'
import VueRouter from 'vue-router'
import Preview from './Preview.vue'
import routes from '@/plugins/router/routes'

import Fabric from './plugins/office-fabric'
import { IPartialTheme } from '@uifabric-vue/styling'

Vue.use(Fabric, {
  palette: {},
} as IPartialTheme, true)

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
})

Vue.config.productionTip = false

new Vue({
  render: (h: CreateElement) => h(Preview),
  router,
}).$mount('#app')
