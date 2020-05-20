import Vue, { CreateElement } from 'vue'
import VueRouter from 'vue-router'
import VueHighlightJS from 'vue-highlightjs'

import Preview from './Preview.vue'
import routes from '@/plugins/router/routes'
import DocPage from './pages/DocPage.vue'

import Fabric, { initializeIcons, IOptions, IPartialTheme } from '@uifabric-vue/office-ui-fabric-vue'

initializeIcons()

Vue.use(Fabric, { useCSSVars: true } as IOptions, {} as IPartialTheme)

Vue.use(VueRouter)
Vue.use(VueHighlightJS)

Vue.component('DocPage', DocPage)

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
