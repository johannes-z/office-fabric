import { FabricComponents } from '@uifabric-vue/office-ui-fabric-vue'

const publicPath = process.env.NODE_ENV === 'production'
  ? '/office-fabric/'
  : '/'

const routes: any[] = []
for (const name in FabricComponents) {
  routes.push({
    name,
    path: `${publicPath}/${name}`,
    component: () => import(`@/pages/${name}.vue`),
    props: {},
  })
}
routes.push({
  name: 'Button',
  path: `${publicPath}/Button`,
  component: () => import(`@/pages/Button.vue`),
  props: {},
})

export default routes
