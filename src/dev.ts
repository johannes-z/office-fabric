import 'reflect-metadata'
import Vue, { CreateElement } from 'vue'
import VueRouter from 'vue-router'
import Preview from './Preview.vue'
import routes from '@/router/routes'

import Fabric, { ITheme } from './plugins/office-fabric'

Vue.use(Fabric, {
  theme: {
    'themePrimary': '#bd3e3e',
    'themeLighterAlt': '#fcf6f6',
    'themeLighter': '#f4dada',
    'themeLight': '#ebbcbc',
    'themeTertiary': '#d78181',
    'themeSecondary': '#c55151',
    'themeDarkAlt': '#aa3838',
    'themeDark': '#8f2f2f',
    'themeDarker': '#6a2323',
    'neutralLighterAlt': '#f8f8f8',
    'neutralLighter': '#f4f4f4',
    'neutralLight': '#eaeaea',
    'neutralQuaternaryAlt': '#dadada',
    'neutralQuaternary': '#d0d0d0',
    'neutralTertiaryAlt': '#c8c8c8',
    'neutralTertiary': '#bab8b7',
    'neutralSecondary': '#a3a2a0',
    'neutralPrimaryAlt': '#8d8b8a',
    'neutralPrimary': '#323130',
    'neutralDark': '#605e5d',
    'black': '#494847',
    'white': '#ffffff',
  } as ITheme,
})

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
})

Vue.config.productionTip = false

new Vue({
  render: (h: CreateElement) => h(Preview),
  router,
}).$mount('#app')
