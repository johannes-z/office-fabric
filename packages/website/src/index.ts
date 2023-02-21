import Vue, { CreateElement } from 'vue-demi'
import VueCompositionAPI from '@vue/composition-api'

import VueRouter from 'vue-router'

import Preview from './Preview.vue'
import routes from '@/plugins/router/routes'
import BasePage from './pages/BasePage.vue'

import Fabric, { initializeIcons } from '@uifabric-vue/office-ui-fabric-vue'
import { initializeFileTypeIcons } from '@uifabric-vue/file-type-icons'

Vue.use(VueCompositionAPI)

initializeIcons()
initializeFileTypeIcons()

Vue.use(VueRouter)
Vue.use(Fabric)

Vue.component('BasePage', BasePage)

// eslint-disable-next-line
// import '@uifabric-vue/ie11-polyfills'

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
