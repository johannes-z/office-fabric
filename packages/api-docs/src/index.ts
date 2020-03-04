import Vue, { CreateElement } from 'vue'
import VueRouter from 'vue-router'
import Preview from './Preview.vue'
import routes from '@/plugins/router/routes'

import Fabric, { initializeIcons, IOptions, IPartialTheme } from '@uifabric-vue/office-ui-fabric-vue'

initializeIcons()

Vue.use(Fabric, {} as IPartialTheme, {
  useCSSVars: true,
} as IOptions)

Vue.use(VueRouter)

const router = new VueRouter({
  base: process.env.NODE_ENV === 'production'
    ? '/office-fabric/'
    : '/',
  routes,
})

Vue.config.productionTip = false

new Vue({
  render: (h: CreateElement) => h(Preview),
  router,
}).$mount('#app')
