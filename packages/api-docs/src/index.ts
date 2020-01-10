import Vue, { CreateElement } from 'vue'
import VueRouter from 'vue-router'
import Preview from './Preview.vue'
import routes from '@/plugins/router/routes'

import Fabric from '@uifabric-vue/office-ui-fabric-vue'
import { IPartialTheme } from '@uifabric/styling'

import { initializeIcons } from '@uifabric/icons'

initializeIcons()

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
