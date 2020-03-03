import { FabricComponents } from '@uifabric-vue/office-ui-fabric-vue'

const routes: any[] = []
for (const name in FabricComponents) {
  routes.push({
    name,
    path: `/${name}`,
    component: () => import(`@/pages/${name}.vue`),
    props: {},
  })
}
routes.push({
  name: 'Welcome',
  path: `/`,
  component: () => import(`@/Welcome.vue`),
  props: {},
})
routes.push({
  name: 'Button',
  path: `/Button`,
  component: () => import(`@/pages/Button.vue`),
  props: {},
})
routes.push({
  name: 'BasicList',
  path: `/BasicList`,
  component: () => import(`@/pages/BasicList.vue`),
  props: {},
})

export default routes
