import * as components from '@/components'

const routes: any[] = []
for (const name in components) {
  console.log(name)
  routes.push({
    name,
    path: `/${name}`,
    component: () => import(`@/pages/${name}.vue`),
    props: {},
  })
}
routes.push({
  name: 'Button',
  path: `/Button`,
  component: () => import(`@/pages/Button.vue`),
  props: {},
})

export default routes
